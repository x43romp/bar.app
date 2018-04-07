// loading globals
const robot = require(`robotjs`);
const express = require(`express`);
const moment = require(`moment`);
const foreverm = require(`forever-monitor`);
const app = express();

var exec = require(`child_process`).exec;

var boards;
module.exports = class BarService {
    constructor(config, boards) {
        app.set(`pid`, `barservice`);
        app.set(`port`, config.port);

        // GET /
        app.get(`/`, (req, res) => {
            res.end(JSON.stringify({
                "working": true
            }));
        });


        // GET /tap/{board}/{tap}
        app.get(`/tap/:board/:tap`, (req, res) => {
            res.setHeader(`Content-Type`, `application-json`);
            this.boards = boards;
            var board = req.params.board;
            var tap = req.params.tap;
            var timestart = moment().format(`x`);

            // Check if the board and tap exists
            if (!(board in boards)) res.end(this._sError(`noboard`, `board does not exist`));
            if (!(tap in boards[board].actions)) res.end(this._sError(`notap`, `tap does not exist`))

            // process the tap
            boards[board].actions[tap].forEach((t) => {
                t.loop = t.loop || 1;
                t.mods = (`mods` in t) ? t.mods : [];

                for (var i = 0; i < t.loop; i++) {
                    switch (t.method) {
                        case `keytap`:
                            robot.keyTap(t.action, t.mods);
                            break;
                        case `keytoggle`:
                            robot.keyToggle(t.action, t.mode, t.mods);
                            break;
                        case `keydelay`:
                            robot.setKeyboardDelay(t.action);
                            break;
                        case `string`:
                            robot.typeString(t.action);
                            break;
                        case `stringdelay`:
                            robot.typeString(t.action, t.mode);
                            break;
                    }
                }

                res.end(this._sSuccess('00', `success ${board} - ${tap}`, timestart));


            });


        });
    }

    start() {
        app.listen(app.get(`port`), () => {
            console.log(`service started`);
        })
    }

    /**
     * returns error json
     * @param  {string} code codename
     * @param  {string} msg  explination of the error
     * @return {string} returns a json string
     */
    _sError(code, msg) {
        return JSON.stringify({
            error: {
                code: `${code}`,
                message: `${msg}`
            }
        });
    }

    /**
     * returns success json
     * @param  {string} code codename
     * @param  {string} msg description
     * @param  {int} start the timestamp(x) of when the process started
     * @return {string} return sa json string
     */
    _sSuccess(code, msg, start) {
        return JSON.stringify({
            success: {
                code: `${code}`,
                message: `${msg}`,
                start: start,
                end: moment().format(`x`),
                duration: (parseInt(moment().format(`x`)) - parseInt(start))
            }
        });
    }
};