/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MainController = {
    index: function(req, res) {
        res.view();
    },
    signup: function(req, res) {
        User.signup({
            name: req.param('name'),
            email: req.param('email'),
            password: req.param('password')
        }, function(err, user) {
            // res.negotiate() will determine if this is a validation error
            // or some kind of unexpected server error, then call `res.badRequest()`
            // or `res.serverError()` accordingly.
            if (err) return res.negotiate(err);

            // Go ahead and log this user in as well.
            // We do this by "remembering" the user in the session.
            // Subsequent requests from this user agent will have `req.session.me` set.
            req.session.me = user.id;

            // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
            // send a 200 response letting the user agent know the signup was successful.
            if (req.wantsJSON) {
                return res.ok('Signup successful!');
            }

            // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
            return res.redirect('/welcome');
        });
    },

    login: function(req, res) {
        return res.login({
            email: req.param('email'),
            password: req.param('password'),
            successRedirect: '/',
            invalidRedirect: '/login'
        });
    },

    logout: function(req, res) {

        // "Forget" the user from the session.
        // Subsequent requests from this user agent will NOT have `req.session.me`.
        req.session.me = null;

        // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // send a simple response letting the user agent know they were logged out
        // successfully.
        if (req.wantsJSON) {
            return res.ok('Logged out successfully!');
        }

        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.redirect('/');
    },
    chat: function(req, res) {
        if (!req.body) {
            return res.badRequest('No body data passed.');
        }

        chat.create(req.body).exec(function(err, chat) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(chat);
        });
    },

    logout: function(req, res) {

        // "Forget" the user from the session.
        // Subsequent requests from this user agent will NOT have `req.session.me`.
        req.session.me = null;

        // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // send a simple response letting the user agent know they were logged out
        // successfully.
        if (req.wantsJSON) {
            return res.ok('Logged out successfully!');
        }

        // Otherwise if this is an HTML-wanting browser, do a redirect.
        return res.redirect('/');
    },
};
module.exports = MainController;
