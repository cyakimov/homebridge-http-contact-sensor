# homebridge-http-contact-sensor

This is a plugin for [homebridge](https://github.com/nfarina/homebridge) which can monitor Contact / Door sensor via a HTTP endpoint that returns `0` or `1` depending on the sensor state.

## Installation

First of all you need to have [Homebridge](https://github.com/nfarina/homebridge) installed. Refer to the repo for 
instructions.  
Then run the following command to install `homebridge-http-contact-sensor`

```
sudo npm install -g homebridge-http-contact-sensor
```

## Example config

```json
  {
    "accessory": "Contact Sensor",
    "name": "Front Door",
    "pollInterval": 500,
    "statusUrl": "http://localhost/sensor-status"
  }
```
