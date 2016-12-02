# README


# Mike's WX Station Dashboard- GA WDI-12 Final Project 4

Mike's Weather Station Dashboard is a Internet of Things Project that integrates an ESP8266 Micro-controller, BME280 Atmospheric Pressure Sensor Temperature Humidity Sensor along with an LCD display to collect and display weather data.  This data is then sent to a cloud based repository, ThingSpeak.com and displays in real-time, the weather data collected and visualized into charts and data displays. The WX Dashboard uses Thingspeak API's to render realtime charts.  In addition to collection and displaying of data, the application provides monitoring and realtime notification of off-line failure with SMS text message alerts.

![Rubin WX Station Overview](http://rubinsworld.com/ga/rubin-wx-stn/overview.png)

### User Stories

* As a user, the weather station will capture Temperature, barometric pressure, and display on lcd display.
* As a user, the data can be visualized on a web page as display data along with the date it was captured.
* As a user, historical data will be visualized for both temperature and barometric pressure.
* As a user, if the data connection to weather station controller is not working, the display will indicate that the station is offline.
* as a user, at first instance of the weather station being offline, notification will be sent via SMS text message to the user.
* as a user, Once the application returns on-line, the Alert Offline message will clear.



### Technologies Used

* Arduino IDE was used to modify the C/C++ code libraries used for the ESP8266 Arduino Core module on the NodeMCU controller package.
* The Front-End is an Express JQuery app with NodeJs running in the backend.
* HTML was used only for structuring content.
* CSS was used for applying all visual styles.
* ThinkSpeak API Library
* D3 API Library for rendering Bar Codes
* Highcharts API Library from ThinkSpeak
* TextMagic NodeJs Library for SMS messages


### Installing

Arduino Installation requires the IDE environment:  Here are links for installation on MAC computer

Arduino IDE:
https://www.arduino.cc/en/Main/Software

ESP8266 core. Use the instructions for "Installing with Boards Manager":
https://github.com/esp8266/Arduino

You may wish to download the CP2102 USB driver but I would recommend against installing it before you have the hardware connected:
http://www.silabs.com/products/mcu/pages/usbtouartbridgevcpdrivers.aspx


```
https://github.com/merubin/mikewtxstn

```

## Back-end Installation.


## Front-end Installation.


To begin the application locally go to the following URL:
http://localhost:4200


## Deployment.
  Both the back-end and front-end have been fully deployed.  Each individual contributor has their own deployment site. The following are the deployment locations and URL's fore each contributor:



|Contributor  | Hosted Repo | Heroku Host URL |
| ----------- | :------------- | :---------- |
|**Mike Rubin**| https://github.com/merubin/mikewtxstn |https://wx-stn.herokuapp.com/ |  


## Approach Taken

[1] On October 29th 2016 I attended a 1 day course "Internet of Things Weather Station". This was presented by the Institute of Electrical Engineers (IEEE) Northern Va Section. During this course we built from a kit the hardware portion of weather station presented as part of this project.

[2] To further my knowledge, I modified the software to customize it for use in this project.

[3] A initial design of the front-end user dashboard was decided on using technologies including D3 and Web-Sockets.

[4] It was decided that the back-end would communicate with ThinkSpeak and use this data to determine whether the state of the weather station being on/off line.

[5] The MVP was determined to display data results on the web page.  A Bronze level would add charting, a Silver level would include user notification for off line.  The Gold Level was not reached but would add additional historical functionality.


## Future Features
* UI Enhancements- Scales for Bar Charts.  Additional Bar Charts for other properties
-
-


## Authors
* **Mike Rubin** - *Initial work* - [Rubin IT Solutions](http://mike-rubin.com)


## License

This project is licensed under the MIT License.

## Acknowledgments

* Thank you to Karl Berger and Martin Schulman who as part of the IEEE course I took. Thank you to all my WDI-12 teachers, Jesse Shawl, Nick Olds, and Adrain Maseda, who have provided me the knowledge to enable this final WDI project to be produced.

* I want to thank those students of WDI-12 for their project suggestions and inspiration and good words to make our program a success.
