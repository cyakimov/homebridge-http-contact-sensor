const http = require('http');

var Service, Characteristic, ContactState;

module.exports = function (homebridge) {
        Service = homebridge.hap.Service;
        Characteristic = homebridge.hap.Characteristic;
        ContactState = homebridge.hap.Characteristic.ContactSensorState;
        homebridge.registerAccessory("homebridge-http-contact-sensor", "ContactSensor", ContactSensorAccessory);
};

function ContactSensorAccessory(log, config) {
        this.log = log;
        this.name = config.name;
        this.pollInterval = config.pollInterval;
        this.statusUrl = config.statusUrl || null;

        if (this.statusUrl == null) {
                this.log("statusUrl is required");
                process.exit(1);
        }

        this.isClosed = true;
        this.wasClosed = true;

        this.service = new Service.ContactSensor(this.name);
        setTimeout(this.monitorContactState.bind(this), this.pollInterval);
};

ContactSensorAccessory.prototype = {
        identify: function (callback) {
                callback(null);
        },

        monitorContactState: function () {
                this.isDoorClosed((state) => {
                        this.isClosed = state;
                        if (this.isClosed != this.wasClosed) {
                                this.wasClosed = this.isClosed;
                                this.service.getCharacteristic(Characteristic.ContactSensorState).setValue(this.isClosed);
                        }
                        setTimeout(this.monitorContactState.bind(this), this.pollInterval);
                })
        },

        isDoorClosed: function (callback) {
                if (this.statusUrl != null) {
                        http.get(this.statusUrl, (resp) => {
                                let data = '';
                                resp.on('data', (chunk) => {
                                        data += chunk;
                                });
                                resp.on('end', () => {
                                        callback(parseInt(data) || 0);
                                });
                        }).on("error", (err) => {
                                console.error("Error: " + err.message);
                                callback();
                        });
                }
        },

        getContactSensorState: function (callback) {
                this.isDoorClosed((state) => {
                         this.isClosed = parseInt(state) || 0;
                        this.log("getContactSensorState: ", this.isClosed);
                        callback(null, this.isClosed);
                });
        },

        getName: function (callback) {
                callback(null, this.name);
        },

        getServices: function () {
                var informationService = new Service.AccessoryInformation();

                informationService
                        .setCharacteristic(Characteristic.Manufacturer, "ContactSensor")
                        .setCharacteristic(Characteristic.Model, "FrontDoor")
                        .setCharacteristic(Characteristic.SerialNumber, "Version 1.0.3");

                this.service
                        .getCharacteristic(Characteristic.ContactSensorState)
                        .on('get', this.getContactSensorState.bind(this));

                this.service
                        .getCharacteristic(Characteristic.Name)
                        .on('get', this.getName.bind(this));

                return [informationService, this.service];
        }
};
