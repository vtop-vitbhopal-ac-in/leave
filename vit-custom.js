$(document).ajaxComplete(function (event, xhr, settings) {

	//console.log(event);
	//console.log(xhr);
	//console.log(xhr.responseText);
	//console.log(settings);

	if (xhr.status == 403) {//unauthorized calls
		// do whatever want with the event ie:
		//event.stopImmediatePropagation();
		//show a global UI for ajax login again
		//console.error('403 response');
		var accessDenyModal = new bootstrap.Modal(document.getElementById('accessDeniedModal'));
		accessDenyModal.show();
	}

});

//calling controller method for navigation of view using parameterized urlPattern
function loadmydiv(urlPattern, menuForm) {

	var winImage = $("#winImage").val();
	var authorizedID = $("#authorizedIDX").val();
	var dataText = "verifyMenu=true&winImage=" + winImage + "&authorizedID=" + authorizedID + "&nocache=@(new Date().getTime())"
	var dataToBeSend = $('#' + menuForm).serialize() + "&" + dataText;

	$.blockUI({ message: $("#popup") });

	if (urlPattern == undefined || urlPattern == null) {
		$("#myModalFooter").modal();
		$.unblockUI();
	} else {

		$.ajax({
			type: "POST",
			url: urlPattern,
			data: dataToBeSend,
			success: function (data, textStatus, request) {
				var status = request.status;
				//console.log(status);
				if (status == 231) {
					$("html").html($("html", data).html());
					location.reload();
				} else if (status == 232) {
					$("#page_outline").html(data);
				} else if (status == 233) {
					$("#page-wrapper").html(data);
				} else {
					$("#page-wrapper").html(data);
				}
				$.unblockUI();
			},
			error: function (request, textStatus, errorThrown) {
				$("#myModalFooter").modal();
				$.unblockUI();
			}
		});
	}
}



function ajaxCall(urlText, dataText, target) {

	$.blockUI({ message: $("#popup") });
	var success_flag = true;

	var findText = "___INTERNAL___RESPONSE___";

	if (target == null) {
		target = "page-wrapper";
	}
	$("#b5-pagewrapper").html("");
	$("#b3endmarker").addClass("d-block");
	$("#b3wrapper").removeClass("noshow")
	$("#b3wrapper").addClass("showBlock")
	$("#b5wrapper").removeClass("showBlock")
	$("#b5wrapper").addClass("noshow")


	$.ajax({
		type: "POST",
		url: urlText,
		data: dataText,
		success: function (response, textStatus, request) {

			if (response.search(findText) == -1) {
				$("#" + target).html(response);
				$.getScript("assets/js/Bootstrap3Compatible.js", function (data, textStatus, jqxhr) {
					//console.log(data); // data returned
					//console.log(textStatus); // success
					//console.log(jqxhr.status); // 200
					//console.log('Load was performed.');
				});
			} else {
				var status = request.status;
				if (status == 231) {
					$("html").html($("html", response).html());
					location.reload();
				} else if (status == 232) {
					$("#page_outline").html(response);
				} else if (status == 233) {
					$("#page-wrapper").html(response);
				} else {
					$("#page-wrapper").html(response);
				}
				$.getScript("assets/js/Bootstrap3Compatible.js", function (data, textStatus, jqxhr) {
					//console.log(data); // data returned
					//console.log(textStatus); // success
					//console.log(jqxhr.status); // 200
					//console.log('Load was performed.');
				});
			}
			$.unblockUI();
		},
		error: function (jqXHR, textStatus, errorMessage) {
 			success_flag = false;
			$("#page-wrapper").html(errorMessage);
			$.unblockUI();
		}

	});

	return success_flag;

}



function ajaxB5Call(urlText, dataText, target) {

	$.blockUI({ message: $("#popup") });

	var success_flag = true;

	var findText = "___INTERNAL___RESPONSE___";

	if (target == null) {
		target = "b5-pagewrapper";
	}
	$("#page-wrapper").html("");
	$("#b3endmarker").addClass("d-none");
	$("#b3wrapper").removeClass("showBlock")
	$("#b3wrapper").addClass("noshow")
	$("#b5wrapper").removeClass("noshow")
	$("#b5wrapper").addClass("showBlock")


	$.ajax({
		type: "POST",
		url: urlText,
		data: dataText,
		success: function (response, textStatus, request) {

			if (response.search(findText) == -1) {
				$("#" + target).html(response);
			} else {
				var status = request.status;
				if (status == 231) {
					$("html").html($("html", response).html());
					location.reload();
				} else if (status == 232) {
					$("#page_outline").html(response);
				} else if (status == 233) {
					$("#b5-pagewrapper").html(response);
				} else {
					$("#b5-pagewrapper").html(response);
				}
			}
			$.unblockUI();
		},
		error: function (jqXHR, textStatus, errorMessage) {
			success_flag = false;
			$("#b5-pagewrapper").html(errorMessage);
			$.unblockUI();
		}

	});

	return success_flag;

}

function showHelp(module, context) {

	var helpWindow = window.open("", "_blank", "width=600,height=300,top=300,left=300,directories=0,location=0,titlebar=0,toolbar=0,fullscreen=0,menubar=0,status=0");

	$.ajax({
		type: "POST",
		url: "context/help",
		data: "module=" + module + "&context=" + context,
		success: function (response) {

			helpWindow.document.write(response);

		},
		error: function (jqXHR, textStatus, errorMessage) {
			helpWindow.document.write("<h2><b>No Help</b><h2>");
		}
	})

}
function ajaxFormCall(formName, urlText, dataText, target) {

	$.blockUI({ message: $("#popup") });

	var data = $('#' + formName).serialize() + "&" + dataText;
	
	$.ajax({
		type: "POST",
		url: urlText,
		data: data,
		cache: false,
		success: function (response, textStatus, request) {
			//console.log(response);
			//console.log(reqTarget);
			var reqTarget = request.getResponseHeader('wrapper');
			if (reqTarget === 'null' || reqTarget === undefined
				|| reqTarget === null || reqTarget === '') {
				reqTarget = target;
			}
			$("#" + reqTarget).html(response);
			$.unblockUI();
		},
		error: function (jqXHR, textStatus, errorMessage) {
			$("#" + target).html(errorMessage);
			$.unblockUI();
		}

	});

}





