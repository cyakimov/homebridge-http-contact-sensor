# homebridge-http-contact-sensor

This is a plugin for [homebridge](https://github.com/nfarina/homebridge) which can monitor Contact / Door sensor via a HTTP endpoint that returns `0` or `1` depending on the sensor state.

## Install

Previous installation of [Homebridge](https://github.com/nfarina/homebridge) is required.

Then run the following command to install `homebridge-http-contact-sensor`

```
npm install -g homebridge-http-contact-sensor
```

## Configuration

```json
{
    "accessory": "ContactSensor",
    "name": "Front Door",
    "pollInterval": 500,
    "statusUrl": "http://localhost/sensor"
}
```

> You can add as many accessories as needed.

**Example homebridge configuration**


```json
{
    ...
    "accessories": [
        {
            "accessory": "ContactSensor",
            "name": "Front Door",
            "pollInterval": 500,
            "statusUrl": "http://192.168.0.20/sensor"
        }
    ],
    "platforms": [
        ...
    ]
}
```
