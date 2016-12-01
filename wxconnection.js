/* class to keep connection status infromation */

var  wxConnection = class {
      constructor(){
        this.wxStatus=false
        this.lastreading=""
        this.lastreading_ct=0
      }

        wxLastReading(reading) {
           let timestamp=reading.created_at
          if (this.lastreading===timestamp) {
            console.log(timestamp,this.lastreading,this.lastreading_ct);
            this.lastreading_ct++;
            return(this.lastreading_ct)
          }
          else{
            console.log(timestamp,this.lastreading,this.lastreading_ct);
            this.lastreading=timestamp;
            this.lastreading_ct=0
            return(this.lastreading_ct)
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
