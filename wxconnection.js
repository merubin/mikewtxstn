

var  wxConnection = class {
      constructor(){
        this.wxStatus=false
        this.lastreading=""
        this.lastreading_ct=0
      }

        wxLastReading(reading) {
          if (this.lastreading===reading) {
            this.lastreading_ct++;
          }
          else{
            console.log(reading,this.lastreading,this.lastreading_ct);
            this.lastreading=reading;
            this.lastreading_ct=0
          }
        }
        wxConnected() {
           return(this.wxStatus)
       }

        wxConnect()
       {
         this.wxStatus=true
       }

         wxDisconnect() {
        this.wxStatus=false
       }

   }

module.exports = wxConnection
