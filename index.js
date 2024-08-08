const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.json());

app.post('/player/growid/checktoken', (req, res) => {
    const { refreshToken, clientData } = req.body;
    const decodeRefreshToken = Buffer.from(refreshToken, 'base64').toString('utf-8');
    const token = Buffer.from(decodeRefreshToken.replace(/(_token=)[^&]*/, `$1${Buffer.from(clientData).toString('base64')}`)).toString('base64');
    //const token = `refreshToken=${refreshToken}&clientData=${Buffer.from(clientData).toString('base64')}`;
    res.send(
      JSON.stringify({
        status: "success",
        message: "Account Validated.",
        token,
        url: "",
        accountType: "growtopia"
      })
    );
    console.log(refreshToken)
});

app.post('/player/login/dashboard', (req, res) => {
    //res.sendFile(__dirname + '/public/html/dashboard.html');
    const token = Buffer.from(Object.keys(req.body)[0]).toString('base64');;
    res.send(`
        <!DOCTYPE html>
        <html
            lang="en"
            style="background-color: rgba(0, 0, 0, 0); width: 100%; height: 100%"
        >
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Growtopia Player Support</title>
            <link
                rel="icon"
                type="image/png"
                href="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/images/growtopia.ico"
                sizes="16x16"
            />
            <link
                rel="shortcut icon"
                href="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/images/growtopia.ico"
                type="image/x-icon"
            />
            <link
                rel="icon"
                href="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/images/growtopia.ico"
                type="image/x-icon"
            />
            <!-- include bootstrap and custom css -->
            <link
                media="all"
                rel="stylesheet"
                href="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/faq-main.css"
            />
            <!-- include custom css -->
            <link
                media="all"
                rel="stylesheet"
                href="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/shop-custom.css"
            />
            <link
                media="all"
                rel="stylesheet"
                href="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/assets/css/ingame-custom.css"
            />
            <style>
                .modal-backdrop {
                    background-color: rgba(0, 0, 0, 0.1);
                }
                .modal-backdrop + div {
                    overflow: auto;
                }
                .modal-body,
                .content {
                    padding: 0;
                }
            </style>
        </head>
        <body style="background-color: rgba(0, 0, 0, 0)">
            <button
                type="button"
                class="btn btn-primary hidden"
                data-toggle="modal"
                id="modalButton"
                data-target="#modalShow"
                data-backdrop="static"
                data-keyboard="false"
            ></button>
            <div class="content">
                <section class="common-box">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <div class="row">
                                    <div
                                        class="modal fade product-list-popup"
                                        id="modalShow"
                                        tabindex="-1"
                                        role="dialog"
                                        aria-hidden="false"
                                    >
                                        <div
                                            class="modal-dialog modal-dialog-centered"
                                            role="document"
                                        >
                                            <div class="modal-content">
                                                <div class="modal-body">
                                                    <div class="content">
                                                        <section class="common-box">
                                                            <div class="container">
                                                                <div
                                                                    class="section-title center-align"
                                                                >
                                                                    <h2>
                                                                        Log in with
                                                                        your GrowKnight ID
                                                                    </h2>
                                                                </div>
                                                                <div
                                                                    class="row div-content-center"
                                                                >
                                                                    <div
                                                                        class="col-md-12 col-sm-12"
                                                                    >
                                                                        <form
                                                                            method="POST"
                                                                            action="https://gtpsloginsystem.vercel.app/player/growid/login/validate"
                                                                            accept-charset="UTF-8"
                                                                            class=""
                                                                            role="form"
                                                                            required="required"
                                                                            autocomplete="off"
                                                                        >
                                                                            <input
                                                                                name="_token"
                                                                                type="hidden"
                                                                                value="${token}"
                                                                            />
                                                                            <div
                                                                                class="form-group"
                                                                            >
                                                                                <input
                                                                                    id="login-name"
                                                                                    class="form-control grow-text"
                                                                                    placeholder="Your GrowKnight ID Name *"
                                                                                    name="growId"
                                                                                    type="text"
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                class="form-group"
                                                                            >
                                                                                <input
                                                                                    id="password"
                                                                                    class="form-control grow-text"
                                                                                    placeholder="Your GrowKnight ID Password *"
                                                                                    name="password"
                                                                                    type="password"
                                                                                    value=""
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                class="form-group"
                                                                            >
                                                                                <small>
                                                                                    Create account? Enter Name without Password & Log In!
                                                                                </small>
                                                                            </div>
                                                                            <div
                                                                                class="form-group text-center forgot-password"
                                                                            >
                                                                                <a
                                                                                    href="https://gg.gg"
                                                                                    target="_blank"
                                                                                    >Need
                                                                                    Help?
                                                                                    Join
                                                                                    our
                                                                                    Discord!</a
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="form-group text-center"
                                                                            >
                                                                                <input
                                                                                    class="btn btn-lg btn-primary grow-button"
                                                                                    type="submit"
                                                                                    value="Log in / Register"
                                                                                />
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </body>
        <!-- JQUERY LIBRARY -->
        <script src="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/vendors/jquery/jquery-2.1.4.min.js"></script>
        <!-- boostrap javascript -->
        <script src="https://s3.eu-west-1.amazonaws.com/cdn.growtopiagame.com/website/resources/vendors/bootstrap/javascripts/bootstrap.min.js"></script>
        <script>
            let clicked = false;
            $('a').click(function () {
                if (clicked === false) {
                    clicked = true;
                    return true;
                }
                $(this).attr('onclick', 'return false;');
            });
            $('document').ready(function () {
                document.onkeydown = e => {
                    if (e.key == 123) {
                        e.preventDefault();
                    }
                    if (e.key == 'F12') {
                        e.preventDefault();
                    }
                    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
                        e.preventDefault();
                    }
                    if (e.ctrlKey && e.key == 'I') {
                        e.preventDefault();
                    }
                    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
                        e.preventDefault();
                    }
                    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
                        e.preventDefault();
                    }
                    if (e.ctrlKey && e.key == 'U') {
                        e.preventDefault();
                    }
                };
                $('#modalButton').trigger('click');
                $('.close').on('click', function () {
                    window.location = // change the host into your own backend host
                        'https://gtpsloginsystem.vercel.app/player/validate/close'; // https instead of http if u r using ssl
                });
                // $('form').submit($('form .grow-button').attr('disabled', 'true'));
                var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        for (var i = 0; i < mutation.addedNodes.length; i++) {
                            if (mutation.addedNodes[i].tagName == 'DIV') {
                                var thediv = mutation.addedNodes[i];
                                var sw = window.screen.width;
                                if (sw < 667) {
                                    $(thediv).css({
                                        transform: 'scale(0.75)',
                                        'transform-origin': '0 0',
                                        '-webkit-transform': 'scale(0.75)',
                                        '-webkit-transform-origin': '0 0',
                                        overflow: 'auto',
                                    });
                                }
                            }
                        }
                    });
                });
                observer.observe(document.body, {
                    attributes: false,
                    childList: true,
                    characterData: false,
                });
            });
        </script>
        </html>

        `);
});

app.post('/player/growid/login/validate', (req, res) => {
    // Extracting data from the request body
    console.log(req.body)
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const { growId, password, _token } = req.body;
    if (!growId) {
        res.status(400).json({ message: 'Your GrowID cannot be empty.' });
    }
    if (_token === null) {
        res.status(400).json({ message: 'Token cannot be null' });
    }
    const token = Buffer.from(
        `_token=${_token}&growId=${growId}&password=${password}`
    ).toString('base64');
    res.send(
      JSON.stringify({
        status: "success",
        message: "Account Validated.",
        token,
        url: "",
        accountType: "growtopia"
      })
    );
});

app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(5000, function () {
    console.log('Listening on port 5000');
});
