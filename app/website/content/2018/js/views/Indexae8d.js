$(document).ready(function () {
    $(this).loadPage({});
	
	$('.number-int').keydown(function(e){
        if( e.altKey ) {
            return false;
        }
        // Allow: backspace, delete, tab, escape, enter
        if( $.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) ) {
                // let it happen, don't do anything
                return;
        }
        // Ensure that it is a number and stop the keypress
        if( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) ) {
            e.preventDefault();
        }
    });
    $('.number-guion').keydown(function(e){
        if( e.altKey ) {
            return false;
        }
        // Allow: backspace, delete, tab, escape, enter, guion
        if( $.inArray(e.keyCode, [46, 8, 9, 27, 13, 109, 173]) !== -1 ||
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) ) {
                // let it happen, don't do anything
                return;
        }
        // Ensure that it is a number and stop the keypress
        if( (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105) ) {
            e.preventDefault();
        }
    });

    $('.mobile_nav_icon').click(function(){
        $('body').addClass('open_navigation');
    });

    $('.dark_mask_mobile').click(function(){
        $('body').removeClass('open_navigation');
    });

    $('.mobile_close_nav_icon').click(function(){
        $('body').removeClass('open_navigation');
    });

    lastScroll = 0;
    $(window).on('scroll', function(){
        var scroll = $(window).scrollTop();
        if(lastScroll - scroll > 0) {
            $('body').addClass('down_topheader');
        } else {
            $('body').removeClass('down_topheader');
        }
        lastScroll = scroll;
    });

    $(window).on('scroll', function(){    
        var scroll = $(window).scrollTop();

        if (scroll >= 48) {
            $('body').addClass('header_fixed');
        } else {
            $('body').removeClass('header_fixed');
        }
    });

    $('div .ribbon-button').click(function () {
        var url = $(this).attr('data-action');
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                $("#divContent").empty().append(data);
            },
            error: function (xhr, status, error) {
                $("#Message").Message({ Message: error, Icon: 'Error' });
            }
        });
    });

    $('#idNuevoUsuario').click(function () {
        window.location.href = $('#UrlNuevoPostulante').val();
    });

    $('#username').keypress(function (e) {
        if (e.which == 13) {
            $('#pwd').focus();
        }
    });
    $('#pwd').keypress(function (e) {
        if (e.which == 13) {
            $('#btnIngresar').click();
        }
    });

    $('#btnIngresar').click(function () {
        var user = $('#username');
        var pwd  = $('#pwd');

        if( $.trim(user.val()) == '' ) {
            $("#Message").Message({ Title: 'Acceso del postulante', Message: 'Por favor, ingrese su correo electrónico.', Icon: 'Info', Focus: $("#username") });
            user.val('');
            return false;
        } else {
            user.val( $.trim(user.val()) );
        }

        if( $.trim(pwd.val()) == '' ) {
            $("#Message").Message({ Title: 'Acceso del postulante', Message: 'Por favor, ingrese su contraseña.', Icon: 'Info', Focus: $("#pwd") });
            pwd.val('');
            return false;
        } else {
            pwd.val( $.trim(pwd.val()) );
        }
        
        $(this).searchData({
            colSearch: [
                { col: 'vUsuario', name: 'username', type: 'string' },
                { col: 'vPassword', name: 'pwd', type: 'string' }
            ],
            method: $("#UrlLogin").val(),
            success: function (resultado) {
                //console.log(resultado);
                if (resultado.iEstado == 1) {
                    $.blockUI({ message: '<span style="color: #555;">Procesando su solicitud...</span>' });
                    window.location = resultado.vUrl; // + '/' + resultado.iId;
                } else {
                    $("#Message").Message({ Title: 'Acceso del postulante', Message: resultado.vMensaje, Icon: 'Info', Focus: $("#username") });
                }
            }
        });
        
        return false;
    });
    
    //$("#username").focus();
    $("#divOlvidoContrasena").dialogManagement({ title: 'Resultados', height: 350, width: 350 });
	
    //$("#idOlvidoContrasena").bind("click", VerOlvidoContrasena);
	
	$('.blockPage').on('click', function(e){
		$.blockUI({ message: '<span style="color: #555;">Procesando su solicitud...</span>' });
	});
	
	$('.qw_bt_ver_mas').on('click', function(){
		var enlace = $(this).find('a').eq(0);
		var value  = enlace.data('value');
		
		if( value == 0 ) {
			$('.qw_bt_item_comunicado').removeClass('hidden');
			enlace.html('ocultar comunicados');
			enlace.data('value', 1);
		} else if( value == 1 ) {
			$('.qw_bt_item_comunicado').addClass('hidden');
			enlace.html('ver m&aacute;s comunicados');
			enlace.data('value', 0);
		}
	});
});

function VerOlvidoContrasena(codigo) {
    $(".content").showDialogManagement({
        //id: 0,
        div: 'divOlvidoContrasena',
        title: "Recordatorio de Contraseña",
        url: $("#UrlOlvidoContrasena").val()
    });

    return false;
};