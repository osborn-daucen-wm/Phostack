module.exports = {

	// addConv:function (req,res) {

	// 	var data_from_client = req.params.all();
	//
  //       if (req.isSocket && req.method === 'POST') {
	//
  //           // This is the message from connected client
  //           // So add new conversation
  //           chat.create(data_from_client)
  //               .exec(function(error, data_from_client) {
  //                   console.log(data_from_client);
  //                   chat.publishCreate({
  //                   	id: data_from_client.id,
  //                   	message: data_from_client.message,
  //                   	user: data_from_client.user
  //                   });
  //               });
  //       } else if (req.isSocket) {
  //           // subscribe client to model changes
  //           chat.watch(req.socket);
  //           console.log('User subscribed to ' + req.socket.id);
  //       }
	// }

	create: function (req, res) {
        if (!req.body) {
            return res.badRequest('No body data passed.');
        }

        chat.create(req.body).exec(function (err, chat) {
            if (err) {
                return res.serverError(err);
            }

            return res.jsonx(chat);
        });
    },

		destroy: function (req, res) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id passed.');
        }

        chat.update(id, {isEnabled: false}).exec(function (err, chat) {
            if (err) {
               return res.serverError(err);
            }

            return res.jsonx(chat);
        });
    },
};
