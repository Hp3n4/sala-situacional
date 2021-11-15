$(document).ready(function () {
    $('#rbtColegiaturaNo').click(function() {
        if( $(this).is(':checked') ) {
            $('#txtColegiatura').val('').prop('disabled', true).prop('required', false);
        } 
    });
    $('#rbtColegiaturaSi').click(function() {
        if( $(this).is(':checked') ) {
            $('#txtColegiatura').prop('disabled', false).prop('required', true);
        }
    });
    $('#rbtPensionNo').click(function() {
        if( $(this).is(':checked') ) {
            $('#ddlsiCodPension').val('').prop('disabled', true).prop('required', false);
        }
    });
    $('#rbtPensionSi').click(function() {
        if( $(this).is(':checked') ) {
            $('#ddlsiCodPension').prop('disabled', false).prop('required', true);
        }
    });
    
    $("#btnVerConvocatorias").click(function () {
        //windows.href = $("#UrlNuevoPostulante").val();
        $(location).attr('href', $("#UrlVerConvocatorias").val());
    });

    $('#ddlcCodDepartamento').bind("change", BuscarProvincia);
    $('#ddlcCodProvincia').bind("change", BuscarDistrito);
	
	$('.datepicker').datepicker({
		format: 'dd/mm/yyyy',
		weekStart: 1,
		language: 'es-ES',
		autoHide: true
	});
	
    LimpiarControles();
    $("#txtEmail").focus();



    var email1 = document.getElementById('txtEmail');
    var email2 = document.getElementById('txtEmailConfirmar');

    var checkEmailValidate = function() {
        var validations ={
            email: [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, 'Por favor, ingrese un correo electr&oacute;nico v&aacute;lido.']
        };

        validation = new RegExp(validations['email'][0]);

        if( !validation.test(this.value) ) {
            this.setCustomValidity('Invalid');
            $(this).parent().find('.invalid-feedback').eq(0).html(validations['email'][1]);
            return false;
        } else {
            this.setCustomValidity('');
            $(this).parent().find('.invalid-feedback').eq(0).html(validations['email'][1]);
        }

        if( email1.value != email2.value ) {
            email1.setCustomValidity('Invalid');
            $(email1).parent().find('.invalid-feedback').eq(0).html('Las correos no coinciden.');
            return false;
        } else {
            email1.setCustomValidity('');
            $(email1).parent().find('.invalid-feedback').eq(0).html('Por favor, ingrese un correo electr&oacute;nico.');
        }
    };

    email1.addEventListener('change', checkEmailValidate, false);
    email2.addEventListener('change', checkEmailValidate, false);

    var password1 = document.getElementById('txtPassword');
    var password2 = document.getElementById('txtPasswordConfirmar');

    var checkPasswordCompare = function() {
        var pwd = $.trim(password1.value);
        if( pwd.length < 7 ) {
            password1.setCustomValidity('Invalid');
            $(password1).parent().find('.invalid-feedback').eq(0).html('La contrase&ntilde;a debe tener 8 digitos como mínimo.');
            return false;
        } else {
            password1.setCustomValidity('');
            $(password1).parent().find('.invalid-feedback').eq(0).html('Por favor, ingrese una contrase&ntilde;a.');
        }


        if( password1.value != password2.value ) {
            password1.setCustomValidity('Invalid');
            $(password1).parent().find('.invalid-feedback').eq(0).html('Las contrase&ntilde;as no coinciden.');
            return false;
        } else {
            password1.setCustomValidity('');
            $(password1).parent().find('.invalid-feedback').eq(0).html('Por favor, ingrese una contrase&ntilde;a.');
        }
    };

    password1.addEventListener('change', checkPasswordCompare, false);
    password2.addEventListener('change', checkPasswordCompare, false);

    //var validatePostulante = function() {
    $('#btnGuardarDatosPersonales').on('click', function(event){
        if( document.forms[0].checkValidity() ) {
            $(this).searchData({
                colSearch: [
                    { col:'vDNI', name:'txtDni', type:'string' },
                    { col:'vEmail', name:'txtEmail', type:'string' }
                ],
                method: $("#UrlValidaPostulante").val(),
                success: function (data) {
                    if( data.piResultado == 1 ) {
                        //guardamos los datos
                        Guardar();
                    } else if( data.piResultado == 0 ) {
                        $("#Message").Message({ Title:'Validación de datos', Icon:'Info', Section:'', Message:'El DNI ya se encuentra registrado.', Focus: $("#txtDni") });
                    } else if( data.piResultado == -1 ) {
                        $("#Message").Message({ Title:'Validación de datos', Icon:'Info', Section:'', Message:'El correo electr&oacute;nico ya se encuentra registrado.', Focus: $("#txtEmail") });
                    } else if( data.piResultado == -2 ) {
                        $("#Message").Message({ Title:'Validación de datos', Icon:'Info', Section:'', Message:'Ocurri&oacute; un error al momento de realizar su solicitud.', Focus: $("#txtEmail") });
                    } else if( data.piResultado == -3 ) {
                        $("#Message").Message({ Title:'Validación de datos', Icon:'Info', Section:'', Message:'El DNI debe tener m&iacute;nimo 8 caracteres.', Focus: $("#txtDni") });
                    } else {
                        $("#Message").Message({ Title:'Validación de datos', Icon:'Info', Section:'', Message:'Ocurri&oacute; un error al momento de realizar su solicitud.', Focus: $("#txtEmail") });
                    }
                }
            });

            event.preventDefault();
            event.stopPropagation();
        }
    });

    (function() {
        'use strict';
        window.addEventListener('load', function(){
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if( form.checkValidity() === false ) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                    
                    $('.was-validated .form-control:invalid').first().focus();
                    $('html, body').animate({scrollTop: ($(window).scrollTop() - 118) + 'px'}, 100);
                }, false);
            });
        }, false);
    })();
});

function Guardar(){
    $(this).saveAction({
        colModel: [
            { col: 'siCodColegioProfesional', name: 'ddlsiCodColegioProfesional', type: 'int' },
            { col: 'siCodEstadoCivil', name: 'ddlsiCodEstadoCivil', type: 'int' },
            { col: 'vApePaterno', name: 'txtApePaterno', type: 'string' },
            { col: 'vApeMaterno', name: 'txtApeMaterno', type: 'string' },
            { col: 'vNombres', name: 'txtNombres', type: 'string' },
            { col: 'vDNI', name: 'txtDni', type: 'string' },
            { col: 'cGenero', name: 'rbtGenero', type: 'radiovalue' },
            { col: 'sdFecNacimiento', name: 'txtFecNacimiento', type: 'string' },

            { col: 'siCodVia', name: 'ddlsiCodVia', type: 'int' },
            { col: 'vVia', name: 'txtVia', type: 'string' },
            { col: 'siCodZona', name: 'ddlsiCodZona', type: 'int' },
            { col: 'vZona', name: 'txtZona', type: 'string' },

            { col: 'vDireccion', name: 'txtDireccion', type: 'string' },
            { col: 'cCodDepartamento', name: 'ddlcCodDepartamento', type: 'string' },
            { col: 'cCodProvincia', name: 'ddlcCodProvincia', type: 'string' },
            { col: 'cCodDistrito', name: 'ddlcCodDistrito', type: 'string' },
            { col: 'vTelefono', name: 'txtTelefono', type: 'string' },
            { col: 'vCelular', name: 'txtCelular', type: 'string' },
            { col: 'vEmail', name: 'txtEmail', type: 'string' },
            { col: 'vPassword', name: 'txtPassword', type: 'string' },
            { col: 'bDiscapacidad', name: 'rbtDiscapacidad', type: 'radio' },
            { col: 'bFueArmadas', name: 'rbtFFAA', type: 'radio' },
            { col: 'bColegiatura', name: 'rbtColegiatura', type: 'radio' },
            { col: 'bHabilitado', name: 'rbtHabilitado', type: 'radio' },
            { col: 'vNroColegiatura', name: 'txtColegiatura', type: 'string' },

            { col: 'bPension', name: 'rbtPension', type: 'radio' },
            { col: 'siCodPension', name: 'ddlsiCodPension', type: 'int' },
            { col: 'bFamiliar', name: 'rbtFamiliar', type: 'radio' }

        ],
        method: $("#UrlInsertarPostulante").val(),
        message: '¿Está seguro que desea guardar los datos personales?',
        result: 'Se guardó correctamente los datos personales.',
        error: 'Ocurrió un error al guardar los datos personales.',
        success: function (resultado) {
            if (resultado.iEstado == 1) {
                $("#Message").Message({
                    Title: 'Datos personales',
                    Message: 'Se guardó correctamente sus datos personales. Para registrar su Ficha Curricular deberá iniciar sesión con su correo electrónico y contraseña registrados.',
                    Icon: 'Info',
                    result: function () {
                        LimpiarControles();
                        window.location.href = $('#UrlIndex').val();
                    }
                });                
            }
        }
    });
}

function LimpiarControles() {
    $('#vApePaterno').val('');
    $('#vApeMaterno').val('');
    $('#vNombres').val('');
    $('#vDNI').val('');
    $('#sdFecNacimiento').val('');
    $('#vDireccion').val('');
    $('#vTelefono').val('');
    $('#vCelular').val('');

    $('#vEmail').val('');
    $('#vPassword').val('');
    $('#vTelefono').val('');
    $('#vCelular').val('');
    $('#vNroColegiatura').val('');
}

function BuscarProvincia() {
    if( this.value != '' ) {
        $(this).searchData({
            colSearch: [
                { col: 'cCodDepartamento', name: 'ddlcCodDepartamento', type: 'string' }
            ],
            method: $("#UrlListarProvincia").val(),
            success: function (resultado) {
                if (resultado != '') {
                    $("#ddlcCodProvincia").DataSource({ Source: resultado });
                    $("#ddlcCodDistrito").DataSource({ Source: null });
                    $("#ddlcCodProvincia, #ddlcCodDistrito").val('');
                };
            }
        });
    } else {
        $("#ddlcCodProvincia, #ddlcCodDistrito").DataSource({ Source: null });
        $("#ddlcCodProvincia, #ddlcCodDistrito").val('');
    }
}


function BuscarDistrito() {
    if( this.value != '' ) {
        $(this).searchData({
            colSearch: [
                { col: 'cCodProvincia', name: 'ddlcCodProvincia', type: 'string' }
            ],
            method: $("#UrlListarDistrito").val(),
            success: function (resultado) {
                if (resultado != '') {
                    $("#ddlcCodDistrito").DataSource({ Source: resultado });
                    $("#ddlcCodDistrito").val('');
                };
            }
        });
    } else {
        $("#ddlcCodDistrito").DataSource({ Source: null });
        $("#ddlcCodDistrito").val('');
    }
}