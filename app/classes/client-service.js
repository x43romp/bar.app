// loading global
const forever = require(`forever`);


module.exports = class ClientService {
    /**
     * initializes the UID of the service
     */
    constructor() {
        this.foreverUID = `BarService`;
    }


    /**
     * Attempts to start the service
     * @param  {array} config overload the default config.json
     * @return {void}
     */


    startService(config) {
        this._findUID(this.foreverUID).then(res => {
            if (res) {
                console.log(`Service already running... atttempting to restart...`);
                // this.stopService();
            }

            console.log(`Service starting...`);
            // TODO : Pass port config to service.js
            forever.startDaemon(`service.js`, {
                uid: this.foreverUID
            });
            console.log(`Service started`);
        });
    }

    /**
     * Stops the service
     * @return {void}
     */

    stopService() {
        console.log(`Service stopping...`);
        forever.stop(this.foreverUID);
        console.log(`Service stopped.`);
    }

    /**
     * Gets the status of the service
     * @return {void}
     */
    statusCheck() {
        this._findUID(this.foreverUID).then(res => {
            if (res) console.log(`The app ${this.foreverUID} is ONLINE`);
            else console.log(`The app ${this.foreverUID} is OFFLINE`);
        });
    }

    /**
     * returns if a UID exists in forever
     * @param  {string} uid the UID to scan
     * @return {boolean}     true / false
     */
    _findUID(uid) {
        return new Promise((resolve, reject) => {
            forever.list(false, (err, data) => {
                if (!data) {
                    resolve(false);
                    return;
                }
                data.forEach((entry) => {
                    if (entry.uid == uid) resolve(true);
                });
                resolve(false);
            });
        });
    }

};