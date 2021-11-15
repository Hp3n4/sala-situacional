(function (jQuery) {

    jQuery.fn.Select = function (options) {
        var defaults = {
            String: '', // Extension a validar.
            Action: '', // Mensaje a mostrar en caso no se cumpla ningún formato.
            Page: '', // Control a resaltar cuando no se cumpla ningún formato.
            Controls: [],
            ValueName: '',
            DisplayName: '',
            Grid: $('#grid')
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            $.ajax({
                url: options.Grid.Service(),
                data: options.Grid.Parameters({ String: options.String, Action: options.Action, Page: options.Page }),
                dataType: "json",
                type: "POST",
                success: function (resultado) {
                    alert(options.Controls.length);
                    for (i = 0; i < options.Controls.length; i++) {
                        options.Controls[i].DataSource({ Source: resultado, ValueName: options.ValueName, DisplayName: options.DisplayName });
                    }
                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        });
        return false;
    };

    jQuery.fn.Mandatory = function (options) {
        var defaults = {
            Color: '',
            Controls: []
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            for (i = 0; i < options.Controls.length; i++) {
                if (options.Color != '') {
                    options.Controls[i].css({ 'background-color': options.Color });
                } else {
                    options.Controls[i].css({ 'background-color': '#FFFFCA' });
                }
            };
        });
    };

    jQuery.fn.DatePicker = function (options) {
        var defaults = {
            showOn: 'button',
            buttonImage: '../Content/images/calendar.gif',
            buttonImageOnly: true,
            dateFormat: 'dd/mm/yy',
            changeMonth: false,
            changeYear: true
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            $(this).datepicker({ showOn: options.showOn, buttonImage: options.buttonImage, buttonImageOnly: options.buttonImageOnly, dateFormat: options.dateFormat, changeMonth: options.changeMonth, changeYear: options.changeYear });
            $(this).mask("99/99/9999");
        });
    };

    jQuery.fn.Tabs = function (options) {
        var defaults = {
            Items: 1
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            $(this).tabs();
            for (i = 1; i < options.Items; i++) {
                $(this).tabs('disable', i);
            };
        });
    };

    jQuery.fn.Toolbars = function (options) {
        var defaults = {
            Items: 0,
            buttons: []
        };
        var options = $.extend(defaults, options);
        this.each(function () {
            $("#btnNuevo").button({ icons: { primary: "NuevoIcon" } });
            //$("#btnEditar").button({ icons: { primary: "EditIcon" } });
            $("#btnBuscar").button({ icons: { primary: "BuscarIcon"} });
            $("#btnLimpiar").button({ icons: { primary: "LimpiarIcon"} });
            $("#btnGrabar").button({ icons: { primary: "GrabarIcon"} });
            $("#bntCancelar").button({ icons: { primary: "CancelarIcon"} });
            $("#btnCerrar").button({ icons: { primary: "CerrarIcon"} });

            for (i = 0; i < options.buttons.length; i++) {
                if (options.buttons[i].close == true)
                    $('#' + options.buttons[i].name)
                        .button({ icons: { primary: options.buttons[i].icon} })
                        .click(function () {
                            $.unblockUI();
                            return false;
                        });
                else
                    $('#' + options.buttons[i].name).button({ icons: { primary: options.buttons[i].icon} });
            };
        });
    };

    jQuery.fn.Buttons = function (options) {
        var defaults = {
            Option: 'G'
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            if (options.Option == 'C' || options.Option == 'U') {
                $('#btnNuevo').button("disable");
                //$('#btnEditar').button("disable");
                $('#btnBuscar').button("disable");
                $('#btnLimpiar').button("disable");
                $("#btnGrabar").button("enable");
                $("#bntCancelar").button("enable");
            }
            if (options.Option == 'G') {
                $("#btnNuevo").button("enable");
                //$("#btnEditar").button("enable");
                $("#btnBuscar").button("enable");
                $("#btnLimpiar").button("enable");
                $('#btnGrabar').button("disable");
                $('#bntCancelar').button("disable");
            }
        });
    };

    jQuery.fn.WindowsHeight = function (options) {
        var defaults = {
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            $.getDocHeight = function () {
                var D = document;
                return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
            };
            window.parent.Heigth($.getDocHeight());
        });
    };

    jQuery.fn.Parameters = function (options) {
        var defaults = {
            values: '',
            rowNum: '',
            page: '',
            sortName: '',
            sortOrder: 'Asc',
            paging: true,
            dataGrid: true
        };
        var options = jQuery.extend({}, defaults, options);
        var parameters = '';
        var paging = '';
        this.each(function () {
            if (options.paging) {
                if (options.dataGrid) {
                    paging = $(this).DataGrid({ SortName: options.sortName, sortOrder: options.sortOrder });
                } else {
                    paging = "";
                }
                parameters = "{\"vstrPagina\":\"" + paging + "\",\"vstrCadena\":\"" + options.values + "\"}";
            } else {
                parameters = "{\"vstrCadena\":\"" + options.values + "\"}";
            };
        });
        return parameters;
    };

    jQuery.fn.Service = function (options) {
        var defaults = {
            Page: '',
            Method: ''
        };
        var options = jQuery.extend({}, defaults, options);
        var service;
        this.each(function () {
            service = (options.Page == '') ? window.parent.Service() : options.Page;
            service = (options.Method == '') ? service : service + options.Method;
        });
        return service;
    };

    jQuery.fn.Message = function (options) {
        var defaults = {
            Title: 'Mensaje de Usuario',
            Icon: 'Default',
            Section: '',
            Message: '',
            Focus: null,
            result: null
        };
        var options = jQuery.extend({}, defaults, options);
        var message = '';
        var strClass = '';
        var strIcon = 'ui-icon ui-icon-circle-check';
        this.each(function () {
            $(this).attr('title', options.Title);

            switch (options.Icon) {
                case 'Info':
                    strClass = 'ui-icon ui-icon-info';
                    break;
                case 'Question':
                    strClass = 'ui-icon ui-icon-alert';
                    break;
                case 'Error':
                    strClass = 'ui-icon ui-icon-closethick';
                    break;
                case 'Help':
                    strClass = 'ui-icon ui-icon-help';
                    break;
                case 'Default':
                    strClass = 'ui-icon ui-icon-check';
                    break;
                default:
                    strClass = strIcon;
                    break;
            }
            message += '<p style="margin: 20px 0px 20px 0px;">';
            message += '<span class="' + strClass + '" style="margin-right: 6px;"></span>';
            if (options.Section != '') {
                message += '<b>' + options.Section + '</b><br /><br />';
            }
            message += options.Message;
            message += '</p>';
            $(this).html(message);
            $(this).dialog({
                width: 'auto',
                title: options.Title,
                modal: true,
                resizable: false,
                draggable: false,
                buttons: {
                    'Aceptar': function () {
                        $(this).dialog("close");
                        if (options.Focus != null) {
                            options.Focus.focus();
                            $('html, body').animate({scrollTop: ($(window).scrollTop() - 118) + 'px'}, 100);
                        };
						if( options.result === null ) {
						} else {
							options.result();
						}
                    }
                },
                open: function () {
                    $('body').css('overflow', 'hidden');
                },
                close: function() {
                    $('body').css('overflow', 'visible');
                },
				create: function(event, ui) {
					$(this).css('minWidth', '200px');
					$(this).css('maxWidth', '500px');
				}
            });
            //$('.ui-dialog').Center();
        });
    };

    jQuery.fn.Center = function () {
        this.css("position", "absolute");
        this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
        this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
        return this;
    }

    jQuery.fn.Confirm = function (options) {
        var defaults = {
            title: 'Mensaje de Usuario',
            message: '',
            icon: 'Default',
            result: null
        };
        var options = $.extend(defaults, options);
        var message = '';
        var iconClass = 'ui-icon ui-icon-circle-check';
        
		this.each(function () {
            $(this).attr('title', options.title);
            switch (options.icon) {
                case 'Info':
                    iconClass = 'ui-icon ui-icon-info';
                    break;
                case 'Question':
                    iconClass = 'ui-icon ui-icon-alert';
                    break;
                case 'Error':
                    iconClass = 'ui-icon ui-icon-closethick';
                    break;
                case 'Help':
                    iconClass = 'ui-icon ui-icon-help';
                    break;
                case 'Default':
                    iconClass = 'ui-icon ui-icon-check';
                    break;
                default:
                    break;
            };
            message += '<p style="margin: 20px 0px 20px 0px;">';
            message += '<span class="' + iconClass + '" style="margin-right: 6px;"></span>';
            message += options.message;
            message += '</p>';
            $(this).html(message);
            $(this).dialog({
                width: 'auto',
                title: 'Alerta',
                modal: true,
                resizable: false,
                draggable: false,
                buttons: {
                    "Aceptar": function () {
                        $(this).dialog("close");
                        options.result(true);
                    },
                    "Cancelar": function () {
                        $(this).dialog("close");
                        options.result(false);
                    }
                },
				open: function () {
                    $('body').css('overflow', 'hidden');
                },
                close: function() {
                    $('body').css('overflow', 'visible');
                },
				create: function(event, ui) {
					$(this).css('minWidth', '200px');
					$(this).css('maxWidth', '500px');
				}
            });
            //$('.ui-dialog').Center();
        });
    };

    jQuery.fn.textLabel = function (options) {
        var defaults = {
            Value: '',
            ControlsIn: [],
            ControlsOut: []
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            $(this).data('oldVal', jQuery.trim($(this).val()));
            $(this).data('isFocus', false);

            if ($(this).val() == '') {
                texto = $(this).attr('title');
                texto = texto.replace("|", "\n");
                texto = texto.replace("|", "\n");
                $(this).val(texto);
                $(this).addClass('text-label');
            }

            $(this).focus(function () {
                $(this).data('isFocus', true);
                texto = $(this).attr('title');
                texto = texto.replace("|", "\n");
                texto = texto.replace("|", "\n");
                if ($(this).val() == texto) {
                    $(this).val('');
                    $(this).removeClass('text-label');
                }
            });

            $(this).blur(function () {
                $(this).data('isFocus', false);
                if (jQuery.trim($(this).val()) == '') {
                    texto = $(this).attr('title');
                    texto = texto.replace("|", "\n");
                    texto = texto.replace("|", "\n");
                    $(this).val(texto);
                    $(this).addClass('text-label');
                }
            });

            $(this).bind("propertychange keyup input paste", function (event) {
                var value = jQuery.trim($(this).val().replace($(this).attr('title'), ''));
                if ($(this).data('oldVal') != value) {
                    $(this).data('oldVal', value);
                    if (value == '' && $(this).data('isFocus') == false) {
                        $(this).val($(this).attr('title'));
                        $(this).addClass('text-label');
                    }
                }
            });
        });
    };

    jQuery.fn.checkLabel = function (options) {
        var defaults = {
            Value: '',
            ControlsIn: [],
            ControlsOut: []
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            $(this).val(jQuery.trim($(this).val()).replace($(this).attr('title'), ''));
        });
    };

    jQuery.fn.checkFormats = function (options) {
        var defaults = {
            Extension: '', // Extension a validar.
            Message: '', // Mensaje a mostrar en caso no se cumpla ningún formato.
            Control: null // Control a resaltar cuando no se cumpla ningún formato.
        };
        var options = jQuery.extend({}, defaults, options);
        var blnFormat = true;
        var strFormat = jQuery.trim($(this).val());
        this.each(function () {
            blnFormat = (strFormat.toLowerCase().indexOf(options.Extension.toLowerCase()) >= 0 ? true : false);
            if (!blnFormat) {
                if (options.Control != null) { options.Control.addClass('ui-state-error'); };
                if (options.Message != '') {
                    alert(options.Message);
                };
                if (options.Control != null) { options.Control.focus(); };
            } else {
                if (options.Control != null) { options.Control.removeClass('ui-state-error'); };
            };
        });
        return blnFormat;
    };

    jQuery.fn.valInt = function (options) {
        var defaults = {};
        var options = jQuery.extend({}, defaults, options);
        var intValue = 0;
        var intResult = 0;
        this.each(function () {
            intValue = jQuery.trim($(this).val().replace($(this).attr('title'), ''));
            intResult = (intValue == '' || intValue == null) ? 0 : intValue;
        });
        return intResult;
    };

    jQuery.fn.valStr = function (options) {
        var defaults = {};
        var options = jQuery.extend({}, defaults, options);
        var strValue = '';
        var strResult = '';
        this.each(function () {
            if (jQuery.trim($(this).val()) !='') {
                strValue = jQuery.trim($(this).val().replace($(this).attr('title'), ''));
            }            
            strResult = (strValue == '' || strValue == null) ? '' : strValue;
        });
        return strResult;
    };

    jQuery.fn.valText = function (options) {
        var defaults = {};
        var options = jQuery.extend({}, defaults, options);
        var strValue = '';
        var strResult = '';
        this.each(function () {
            strValue = jQuery.trim($(this).find("option:selected").text());
            strResult = (strValue == '' || strValue == null) ? '' : strValue;
        });
        return strResult;
    };

    jQuery.fn.valEncode = function (options) {
        var defaults = {};
        var options = jQuery.extend({}, defaults, options);
        var strValue = '';
        var strResult = '';
        this.each(function () {
            strValue = jQuery.trim($(this).val().replace($(this).attr('title'), ''));
            strResult = (strValue == '' || strValue == null) ? '' : strValue;
            /*if (strResult != '') {
            strResult = CodificarCaracteres(strResult);
            }*/
        });
        return strResult;
    };

    jQuery.fn.Cadena = function (options) {
        var defaults = {
            Values: [],
            Controls: []
        };
        var options = jQuery.extend({}, defaults, options);
        var strValue = '';
        this.each(function () {
            for (i = 0; i < options.Values.length; i++) {
                if (i == options.Values.length) {
                    strValue += jQuery.trim(options.Values[i]);
                } else {
                    strValue += jQuery.trim(options.Values[i]) + '!|';
                }
            };
            for (i = 0; i < options.Controls.length; i++) {
                if (i == options.Controls.length) {
                    strValue += jQuery.trim(options.Controls[i].val());
                } else {
                    strValue += jQuery.trim(options.Controls[i].val()) + '!|';
                }
            };
        });
        return strValue;
    };

    jQuery.fn.DataGrid = function (options) {
        var defaults = {
            RowNum: '',
            Page: '',
            SortName: '',
            SortOrder: 'Asc'
        };
        var options = jQuery.extend({}, defaults, options);
        var strValue = '';
        this.each(function () {
            if ($(this).getGridParam("rowNum") == null || $(this).getGridParam("rowNum") == '') {
                options.RowNum = 100;
            }
            if ($(this).getGridParam("page") == null || $(this).getGridParam("page") == '') {
                options.Page = 1;
            }

            strValue += (options.RowNum == '') ? $(this).getGridParam("rowNum") : options.RowNum;
            strValue += '|' + ((options.Page == '') ? $(this).getGridParam("page") : options.Page);
            strValue += '|' + ((options.SortName == '') ? $(this).getGridParam("sortname") : options.SortName);
            strValue += '|' + ((options.SortOrder == '') ? $(this).getGridParam("sortorder") : options.SortOrder);
        });
        return strValue;
    };

    jQuery.fn.DataSource = function (options) {
        var defaults = {
            Value: '', // Valor a mostrar después de cargar el contenido.
            Source: [], // Origen de Datos
            ValueName: '', // códigos de valores de la lista
            DisplayName: '', // Nombres de valores de la lista
            OptionalValue: true, // Incluye el item (Seleccione) en la lista.
            DefaultOption: '-- Seleccione --'
        };
        var options = jQuery.extend({}, defaults, options);
        var strValue = '';
        this.each(function () {
            strValue = (options.Value == '') ? jQuery.trim($(this).val()) : options.Value;
            $(this).find('option').remove().end();
            if (options.OptionalValue) {
                $(this).append($("<option></option>").attr("value", "").text(options.DefaultOption));
            }
            if (options.Source != '' && options.Source != null) {                
                for (i = 0; i < options.Source.length; i++) {
                    $(this).append($("<option></option>").attr("value", options.Source[i].Value).text(options.Source[i].Text));
                }
            }
            $(this).val(strValue);
        });
        return true;
    };

    jQuery.fn.checkDate = function (options) {
        var defaults = {
            Date: '',
            Message: '',
            Controls: [],
            Section: ''
        };
        var options = jQuery.extend({}, defaults, options);
        var days = 0;
        var blnDate = true;
        this.each(function () {
            //$(this).val(options.Message);
            // Verifica fecha ingresada
            blnDate = checkDate($(this));
            // Compara fechas
            if (options.Date != '' && blnDate == true) {
                days = DaysDiff($(this).val(), options.Date);
                if (days > 0) {
                    blnDate = false;
                    $(this).addClass('ui-state-error');
                    for (i = 0; i < options.Controls.length; i++) {
                        options.Controls[i].addClass('ui-state-error');
                    };
                    if (options.Message == '') { options.Message = 'La fecha ingresada no puede ser mayor a la actual.'; };
                    //alert(options.Message);
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Section: options.Section, Message: options.Message, Focus: $(this).focus() });
                } else {
                    blnDate = true;
                    $(this).removeClass('ui-state-error');
                    for (i = 0; i < options.Controls.length; i++) {
                        options.Controls[i].removeClass('ui-state-error');
                    };
                }
            };
        });
        return blnDate;
    };

    jQuery.fn.checkSelect = function (options) {
        var defaults = {
            Value: '',
            Section: '',
            Message: '',
            Controls: [],
            ValueCero: true,
            Control: null,
            CssClass: true,
            Focus: true
        };
        var options = jQuery.extend({}, defaults, options);
        var blnSelect = true;
        this.each(function () {
            if (options.Value != '') {
                if ($(this).val() != options.Value) {
                    $(this).addClass('ui-state-error');
                    alert(options.Message);
                    $(this).focus();
                    blnSelect = false;
                } else {
                    $(this).removeClass('ui-state-error');
                    blnSelect = true;
                };
            } else {
                if (options.ValueCero) {
                    if ($(this).val() == '' || $(this).val() == null || $(this).val() == '0') {
                        if (options.CssClass) {
                            $(this).addClass('ui-state-error');
                        }
                        blnSelect = false;
                    } else {
                        $(this).removeClass('ui-state-error');
                        blnSelect = true;
                    };
                } else {
                    if ($(this).val() == '' || $(this).val() == null) {
                        if (options.CssClass) {
                            $(this).addClass('ui-state-error');
                        }
                        blnSelect = false;
                    } else {
                        $(this).removeClass('ui-state-error');
                        blnSelect = true;
                    };
                }
                if (options.Focus) {
                    options.Control = (options.Control == null) ? $(this) : options.Control;
                }
                if (options.Message != '' && blnSelect == false) {
                    //alert(options.Message);
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Section: options.Section, Message: options.Message, Focus: options.Control });
                };
                /*if (options.Focus){
                (options.Control == null) ? $(this).focus() : options.Control.focus();
                } */
            };
        });
        return blnSelect;
    };

    jQuery.fn.checkText = function (options) {
        var defaults = {
            Value: '', // Compara con el valor del control.
            Section: '',
            Message: '', // Mensaje a mostrar.
            Controls: [], // Controles a incluir en la validación
            Operator: 'And', // Operador de validación de controles
            Control: null, // Control que indica la obligatoriedad del principal, sólo cuando este tenga un valor.
            CssClass: true,
            Focus: true
        };
        var options = jQuery.extend({}, defaults, options);
        var blnText = true;
        var strValue = jQuery.trim($(this).val()).replace($(this).attr('title'), '');
        this.each(function () {
            blnText = strValue == options.Value ? false : true;
            for (i = 0; i < options.Controls.length; i++) {
                if (options.Operator == 'And') {
                    blnText = (blnText) && (jQuery.trim(options.Controls[i].val().replace(options.Controls[i].attr('title'), '')) == options.Value ? false : true);
                } else {
                    blnText = (blnText) || (jQuery.trim(options.Controls[i].val().replace(options.Controls[i].attr('title'), '')) == options.Value ? false : true);
                };
            };
            if (!blnText) {
                if (options.CssClass) {
                    (options.Control == null) ? $(this).addClass('ui-state-error') : options.Control.addClass('ui-state-error');
                    for (i = 0; i < options.Controls.length; i++) {
                        options.Controls[i].addClass('ui-state-error');
                    };
                };
                if (options.Focus) {
                    options.Control = (options.Control == null) ? $(this) : options.Control;
                }
                if (options.Message != '') {
                    //alert(options.Message);
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Message: options.Message, Focus: options.Control });
                };

            } else {
                (options.Control == null) ? $(this).removeClass('ui-state-error') : options.Control.removeClass('ui-state-error');
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i].removeClass('ui-state-error');
                };
            };
        });
        return blnText;
    };

    jQuery.fn.ShowCss = function (options) {
        var defaults = {
            Message: '', // Mensaje a mostrar.
            Controls: [], // Controles a incluir en la validación
            CssClass: true,
            Focus: null
        };
        var options = jQuery.extend({}, defaults, options);
        var blnText = true;
        this.each(function () {
            if (options.CssClass) {
                $(this).addClass('ui-state-error');
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i].addClass('ui-state-error');
                };
                if (options.Message != '') {
                    alert(options.Message);
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Section: options.Section, Message: options.Message, Focus: options.Control });
                };
                (options.Focus == null) ? $(this).focus() : options.Focus.focus();
            } else {
                $(this).removeClass('ui-state-error');
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i].removeClass('ui-state-error');
                };
            };
        });
        return blnText;
    };

    jQuery.fn.checkControl = function (options) {
        var defaults = {
            Value: '', // Compara con el valor del control.
            Message: '', // Mensaje a mostrar.
            Controls: [], // Controles a incluir en la validación
            Operator: 'And', // Operador de validación de controles
            Control: null // Control que indica la obligatoriedad del principal, sólo cuando este tenga un valor.
        };
        var options = jQuery.extend({}, defaults, options);
        var blnText = true;
        var strValue = jQuery.trim($(this).val());
        this.each(function () {
            blnText = (options.Control == null ? false : true);
            if (blnText) {
                if (jQuery.trim(options.Control.val()) != options.Value) {
                    blnText = (strValue == '' ? false : true);
                };
            };
            if (!blnText) {
                $(this).addClass('ui-state-error');
                if (options.Control != null) { options.Control.addClass('ui-state-error'); };
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i].addClass('ui-state-error');
                };
                if (options.Message != '') {
                    alert(options.Message);
                };
                $(this).focus();
            } else {
                $(this).removeClass('ui-state-error');
                if (options.Control != null) { options.Control.removeClass('ui-state-error'); };
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i].removeClass('ui-state-error');
                };
            };
        });
        return blnText;
    };

    jQuery.fn.checkLength = function (options) {
        var defaults = {
            Value: '',
            Message: '',
            Length: null,
            MinLength: null,
            MaxLength: null,
            Control: null,
            Mandatory: true
        };
        var options = jQuery.extend({}, defaults, options);
        var blnText = true;
        var strValue = jQuery.trim($(this).val()).replace($(this).attr('title'), '');
        this.each(function () {
            if (options.Mandatory) {
                blnText = strValue == options.Value ? false : true;
            };
            if (strValue.length > 0) {
                if (options.Length != null) {
                    blnText = (strValue.length != options.Length ? false : true);
                } else {
                    if (options.MinLength != null && options.MaxLength != null) {
                        if (options.MinLength == options.MaxLength) {
                            blnText = (strValue.length != options.MinLength ? false : true);
                        } else {
                            blnText = (strValue.length < options.MinLength && strValue.length > options.MaxLength ? false : true);
                        }
                    } else if (options.MinLength != null) {
                        blnText = (strValue.length < options.MinLength ? false : true);
                    } else if (options.MaxLength != null) {
                        blnText = (strValue.length > options.MaxLength ? false : true);
                    }
                }                
            };
            if (!blnText) {
                (options.Control == null) ? $(this).addClass('ui-state-error') : options.Control.addClass('ui-state-error');
                if (options.Message != '') {
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Message: options.Message, Focus: $(this) });
                };
                (options.Control == null) ? $(this).focus() : options.Control.focus();
            } else {
                (options.Control == null) ? $(this).removeClass('ui-state-error') : options.Control.removeClass('ui-state-error');
            };
        });
        return blnText;
    };

    $.fn.checkRadio = function (options) {
        var defaults = {
            Value: '',
            Message: ''
        };
        var options = jQuery.extend({}, defaults, options);
        var blnValue = true;
        var strValue = $("input[name=" + $(this).attr("name") + "]:checked").val();
        this.each(function () {
            if ($.isNullOrEmpty(strValue)) {
                blnValue = false;
                $(".checkbox:has([name=" + $(this).attr("name") + "])").addClass('ui-state-error-checkbox');
            } else {
                $(".checkbox:has([name=" + $(this).attr("name") + "])").removeClass('ui-state-error-checkbox');
            }
        });
        if (!blnValue && options.Message != '') {
            $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Message: options.Message });
        };
        return blnValue;
    };

    // Función para comparar controles
    // Devuelve True: si el control principal es igual a los otros controles.
    // Devuelve False: si el control principal es diferente a alguno de los otros controles.
    jQuery.fn.Compare = function (options) {
        var defaults = {
            Value: '',
            Message: '',
            Controls: [],
            Operator: '==' // ('==': iguales, '!=': diferentes)
        };
        var options = jQuery.extend({}, defaults, options);
        var blnCompare = true;
        this.each(function () {
            blnCompare = options.Controls.length <= 0 ? false : true;
            for (i = 0; i < options.Controls.length; i++) {
                if (options.Operator == '==') {
                    blnCompare = (blnCompare) && (jQuery.trim($(this).val()) == jQuery.trim(options.Controls[i].val()) ? true : false);
                } else {
                    blnCompare = (blnCompare) && (jQuery.trim($(this).val()) == jQuery.trim(options.Controls[i].val()) ? false : true);
                }
            };
            if (!blnCompare) {
                $(this).addClass('ui-state-error');
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i].addClass('ui-state-error');
                };
                if (options.Message != '') {
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Message: options.Message });
                };
                $(this).focus();
            } else {
                $(this).removeClass('ui-state-error');
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i].removeClass('ui-state-error');
                };
            };
        });
        return blnCompare;
    };

    jQuery.fn.ReadOnly = function (options) {
        var defaults = {
            Value: true
        };
        var options = jQuery.extend({}, defaults, options);
        this.each(function () {
            var type = $(this).attr("type");
            if (type == 'text') {
                if (options.Value == true) {
                    $(this).attr('readonly', 'readonly');
                    $(this).addClass('Deshabilitado');
                } else {
                    $(this).attr('readonly', '');
                    $(this).removeClass('Deshabilitado');
                };
            } else {
                if (options.Value) {
                    $(this).attr('disabled', 'disabled');
                    $(this).addClass('Deshabilitado');
                } else {
                    $(this).attr('disabled', '');
                    $(this).removeClass('Deshabilitado');
                };
            };
        });
    };

    jQuery.fn.checkEmail = function (options) {
        var defaults = {
            Requiered: false,
            Message: ''
        };
        var options = jQuery.extend({}, defaults, options);
        var blnEmail = true;
        var strValue = jQuery.trim($(this).val()).replace($(this).attr('title'), '');
        this.each(function () {
            if (options.Requiered) {
                blnEmail = (strValue != '') ? true : false;
            };
            if (strValue != '') {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(strValue)) {
                    blnEmail = true;
                }
                else {
                    blnEmail = false;
                };
            };
            if (!blnEmail) {
                $(this).addClass('ui-state-error');
                if (options.Message != '') {
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Message: options.Message, Focus: $(this) });
                };
                $(this).focus();
            } else {
                $(this).removeClass('ui-state-error');
            };
        });
        return blnEmail;
    };

    jQuery.fn.checkVal = function (options) {
        var defaults = {
            Message: '',
            MinValue: null,
            MaxValue: null
        };
        var options = jQuery.extend({}, defaults, options);
        var blnVal = true;
        var value = 0;
        this.each(function () {
            value = Number($(this).val());
            blnVal = (value >= options.MinValue) && (value <= options.MaxValue);
            if (!blnVal) {
                $(this).addClass('ui-state-error');
                if (options.Message != '') { alert(options.Message); };
                $(this).focus();
            } else {
                $(this).removeClass('ui-state-error');
            };
        });
        return blnVal;
    };

    jQuery.fn.checkValues = function (options) {
        var defaults = {
            Value: '', // Compara con el valor del control principal.
            Message: '', // Mensaje a mostrar.
            Controls: [, 2], // Controles a validar con su correspondiente valor de comparacion (valores: '==','!=')
            Operator: 'And', // Operador de validación de controles ('And': Todos los controles cumplen la condición, 'Or': cualquier control cumple la condicion)
            Focus: null, // Control a enfocar al devorvel el valor false.
            Compare: '==', // tipo de comparación del control principal con el valor por defecto ('==':igual, '!=': diferente)
            CssClass: true,
            CssExclude: []
        };
        var options = jQuery.extend({}, defaults, options);
        var blnText = true;
        var blnExclude = false;
        this.each(function () {
            if (options.Compare == '==') {
                blnText = (jQuery.trim($(this).val()) == options.Value ? true : false);
            } else {
                blnText = (jQuery.trim($(this).val()) != options.Value ? true : false);
            }
            for (i = 0; i < options.Controls.length; i++) {
                var strControl = jQuery.trim(options.Controls[i][0].val());
                if (options.Controls[i][1] == '==') {
                    if (options.Operator == 'And') {
                        blnText = blnText && (strControl == options.Value ? true : false);
                    } else {
                        blnText = blnText || (strControl == options.Value ? true : false);
                    }
                } else {
                    if (options.Operator == 'And') {
                        blnText = blnText && (strControl != options.Value ? true : false);
                    } else {
                        blnText = blnText || (strControl != options.Value ? true : false);
                    }
                }
            };
            if (blnText) {
                for (i = 0; i < options.CssExclude.length; i++) {
                    if (options.CssExclude[i].attr('id') == $(this).attr('id')) {
                        blnExclude = true;
                        break;
                    };
                };
                if (!blnExclude && options.CssClass) { $(this).addClass('ui-state-error'); };
                for (i = 0; i < options.Controls.length; i++) {
                    blnExclude = false;
                    for (j = 0; j < options.CssExclude.length; j++) {
                        if (options.CssExclude[j].attr('id') == options.Controls[i][0].attr('id')) {
                            blnExclude = true;
                            break;
                        };
                    };
                    if (!blnExclude && options.CssClass) { options.Controls[i][0].addClass('ui-state-error'); };
                };
                if (options.Message != '') {
                    alert(options.Message);
                };
                (options.Focus == null) ? $(this).focus() : options.Focus.focus();
            } else {
                $(this).removeClass('ui-state-error');
                if (options.Control != null) { options.Control.removeClass('ui-state-error'); };
                for (i = 0; i < options.Controls.length; i++) {
                    options.Controls[i][0].removeClass('ui-state-error');
                };
            };
        });
        return blnText;
    };

    $.fn.ValidDId = function (options) {
        var defaults = {
            Length: 12,
            Pattern: /[1234567890]/,
            Control: null
        };
        var options = $.extend({}, defaults, options);
        this.each(function () {
            if (event.keyCode == 8) { return true; };
            $(this).keypress(function (e) {
                return $.fn.ValidDId.lengthDId(e, $(this).val(), options);
            });
        });
    };

    $.fn.ValidDId.alowKeys = function (event, strValue, intChars) {
        if (strValue.length >= intChars) {
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
            return false;
        }
    };

    $.fn.ValidDId.lengthDId = function (event, strValue, options) {
        var blnValid = false;
        var strPattern = /[a-zA-ZÑñ1234567890@.-_áéíóú;:()+*!"·$%& ]/;
        switch (options.Control.val()) {
            case "0": // Sin Documento
                $.fn.ValidDId.alowKeys(event, strValue, 0);
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            case "1": // RUC
                $.fn.ValidDId.alowKeys(event, strValue, 11);
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            case "2": // DNI/Libreta Electoral
                $.fn.ValidDId.alowKeys(event, strValue, 8);
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            case "3": // Carne de Identidad
                $.fn.ValidDId.alowKeys(event, strValue, 12);
                options.Pattern = strPattern;
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            case "4": // Carne de Extranjeria
                $.fn.ValidDId.alowKeys(event, strValue, 12);
                options.Pattern = strPattern;
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            case "5": // Pasaporte
                $.fn.ValidDId.alowKeys(event, strValue, 10);
                options.Pattern = strPattern;
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            case "8": // Otros
                $.fn.ValidDId.alowKeys(event, strValue, 10);
                options.Pattern = strPattern;
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            case "99": // Código SAT
                $.fn.ValidDId.alowKeys(event, strValue, 10);
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
            default:
                $.fn.ValidDId.alowKeys(event, strValue, options.Length);
                options.Pattern = strPattern;
                return options.Pattern.test(String.fromCharCode(event.keyCode));
                break;
        }
        return blnValid;
    };

    $.fn.disable = function () {
        return this.each(function () {
            if (typeof this.disabled != "undefined") {
                $(this).data('jquery.disabled', this.disabled);

                this.disabled = true;
            }
        });
    };

    $.fn.enable = function () {
        return this.each(function () {
            if (typeof this.disabled != "undefined") {
                this.disabled = $(this).data('jquery.disabled');
            }
            $(this).removeAttr("disabled");
        });
    };

    $.fn.exists = function () {
        return this.length !== 0;
    }

    jQuery.isNullOrEmpty = function (s) {
        return (s === undefined || s === null || s === "");
    };

    jQuery.checkBool = function (val) {
        if ((typeof val === 'string' && (val.toLowerCase() === 'true' || val.toLowerCase() === 'yes')) || val === 1 || val === '1')
            return true;
        else if ((typeof val === 'string' && (val.toLowerCase() === 'false' || val.toLowerCase() === 'no')) || val === 0 || val === '0')
            return false;

        return null;
    }

    /*jQuery.alowKeys = function(e, objControl, maxChars) {
    if (objControl.val().length >= maxChars) {
    if (e.preventDefault) e.preventDefault();
    else event.returnValue = false;
    return false;
    }
    }*/

    jQuery.HtmlToString = function (Text) {
        var regexp = /(<([^>]+)>)/ig;
        var strHtml = '';
        strHtml = Text.replace(regexp, '');
        strHtml = strHtml.replace('&nbsp;', '');
        return strHtml;
    };

    jQuery.GetHtmlEditor = function (Obj) {
        return $find(Obj);
    };

    jQuery.FormatNumber = function (nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };

    jQuery.initAjax = function () {
        $(document).ajaxStart(function () {
            $.blockUI({ message: '<span style="color: #555;">Procesando su solicitud...</span>' });
        }).ajaxStop(function () {
            $.unblockUI();
        }).ajaxComplete(function () {
            $.unblockUI();
        });
    };

    jQuery.ChildNodes = function (Obj, item, value) {
        var result;
        if (Obj.cells[item].childNodes.length > 0) {
            result = Obj.cells[item].childNodes.item(0).nodeValue;
        } else {
            result = value;
        }
        return result;
    };

    jQuery.Excel = function () {
        var keys = [], ii = 0, rows = "";
        var ids = $(this).getDataIDs();  // Get All IDs
        var row = $(this).getRowData(ids[0]);     // Get First row to get the labels

        for (var k in row) {
            if (k != 'vAcciones') {
                keys[ii++] = k;    // capture col names
                rows = rows + k + "\t";     // output each Column as tab delimited		  
            }
        }
        rows = rows + "\n";   // Output header with end of line
        for (i = 1; i < ids.length; i++) {
            row = $(this).getRowData(ids[i]); // get each row
            for (j = 0; j < keys.length; j++) rows = rows + row[keys[j]] + "\t"; // output each Row as tab delimited
            rows = rows + "\n";  // output each row with end of line
        }
        rows = rows + "\n";  // end of line at the end
        var form = "<form name='csvExcel' action='frmExcel.aspx' method='post' accept-charset='ISO-8859-1'>";
        form = form + "<input type='hidden' name='Data' value='" + rows + "'>";
        form = form + "</form><script>document.csvExcel.submit();</sc" + "ript>";
        OpenWindow = window.open('', '');
        OpenWindow.document.write(form);
        OpenWindow.document.close();
    };

    function DaysDiff(first, second) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = parseDate(first);
        var secondDate = parseDate(second);

        var diffDays = ((firstDate.getTime() - secondDate.getTime()) / (oneDay));
        return diffDays;
    };

    function parseDate(str) {
        var date = str.split('/');
        return new Date(date[2], (date[1] - 1), date[0]);
    };

    function checkDate(obj) {
        var strFecha = obj.val();
        if (strFecha != undefined && strFecha.value != "") {
            if (!/^\d{2}\/\d{2}\/\d{4}$/.test(strFecha)) {
                obj.addClass('ui-state-error');
                //alert("El formato de fecha no es válido, ingrese con el siguiente formato (dd/mm/aaaa).");
                $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Section: '', Message: 'El formato de fecha no es válido, ingrese con el siguiente formato (dd/mm/aaaa).', Focus: obj.focus() });
                return false;
            }
            var dia = parseInt(strFecha.substring(0, 2), 10);
            var mes = parseInt(strFecha.substring(3, 5), 10);
            var anio = parseInt(strFecha.substring(6), 10);
            switch (mes) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    numDias = 31;
                    break;
                case 4: case 6: case 9: case 11:
                    numDias = 30;
                    break;
                case 2:
                    if (checkBisisesto(anio)) { numDias = 29; } else { numDias = 28; };
                    break;
                default:
                    obj.addClass('ui-state-error');
                    //alert("La fecha ingresada es erróonea.");
                    $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Section: '', Message: 'La fecha ingresada es erróonea.', Focus: obj.focus() });
                    //obj.focus();
                    return false;
            }
            if (dia > numDias || dia == 0) {
                obj.addClass('ui-state-error');
                //alert("La fecha ingresada es errónea.");
                $("#Message").Message({ Title: 'Validaci&oacute;n de Datos', Icon: 'Info', Section: '', Message: 'La fecha ingresada es errónea.', Focus: obj.focus() });
                //obj.focus();
                return false;
            }
            obj.removeClass('ui-state-error');
            return true;
        }
    }

    function checkBisisesto(anio) {
        if ((anio % 100 != 0) && ((anio % 4 == 0) || (anio % 400 == 0))) {
            return true;
        }
        else {
            return false;
        }
    }

    function CodificarCaracteres(cadena) {
        cadena = cadena.replace(/!/g, '0x33');
        cadena = cadena.replace(/\"/g, '0x34');
        cadena = cadena.replace(/#/g, '0x35');
        cadena = cadena.replace(/\$/g, '0x36');
        cadena = cadena.replace(/%/g, '0x37');
        cadena = cadena.replace(/&/g, '0x38');
        cadena = cadena.replace(/'/g, '0x39');
        cadena = cadena.replace(/\(/g, '0x40');
        cadena = cadena.replace(/\)/g, '0x41');
        cadena = cadena.replace(/\*/g, '0x42');
        cadena = cadena.replace(/\+/g, '0x43');
        //cadena = cadena.replace(',','0x44');
        cadena = cadena.replace(/-/g, '0x45');
        cadena = cadena.replace(/\./g, '0x46');
        cadena = cadena.replace(/\//g, '0x47');
        cadena = cadena.replace(/:/g, '0x58');
        cadena = cadena.replace(/;/g, '0x59');
        cadena = cadena.replace(/\</g, '0x60');
        cadena = cadena.replace(/\=/g, '0x61');
        cadena = cadena.replace(/\>/g, '0x62');
        cadena = cadena.replace(/\?/g, '0x63');
        cadena = cadena.replace(/@/g, '0x64');
        cadena = cadena.replace(/\[/g, '0x91');
        cadena = cadena.replace(/\\/g, '0x92');
        cadena = cadena.replace(/]/g, '0x93');
        cadena = cadena.replace(/\^/g, '0x94');
        cadena = cadena.replace(/_/g, '0x95');
        cadena = cadena.replace(/`/g, '0x96');
        cadena = cadena.replace(/{/g, '0x123');
        cadena = cadena.replace(/\|/g, '0x124');
        cadena = cadena.replace(/}/g, '0x125');
        cadena = cadena.replace(/~/g, '0x126');
        cadena = cadena.replace(/Ç/g, '0x128');
        cadena = cadena.replace(/ü/g, '0x129');
        cadena = cadena.replace(/é/g, '0x130');
        cadena = cadena.replace(/â/g, '0x131');
        cadena = cadena.replace(/ä/g, '0x132');
        cadena = cadena.replace(/à/g, '0x133');
        cadena = cadena.replace(/å/g, '0x134');
        cadena = cadena.replace(/ç/g, '0x135');
        cadena = cadena.replace(/ê/g, '0x136');
        cadena = cadena.replace(/ë/g, '0x137');
        cadena = cadena.replace(/è/g, '0x138');
        cadena = cadena.replace(/ï/g, '0x139');
        cadena = cadena.replace(/î/g, '0x140');
        cadena = cadena.replace(/ì/g, '0x141');
        cadena = cadena.replace(/Ä/g, '0x142');
        cadena = cadena.replace(/Å/g, '0x143');
        cadena = cadena.replace(/É/g, '0x144');
        cadena = cadena.replace(/æ/g, '0x145');
        cadena = cadena.replace(/Æ/g, '0x146');
        cadena = cadena.replace(/ô/g, '0x147');
        cadena = cadena.replace(/ö/g, '0x148');
        cadena = cadena.replace(/ò/g, '0x149');
        cadena = cadena.replace(/û/g, '0x150');
        cadena = cadena.replace(/ù/g, '0x151');
        cadena = cadena.replace(/ÿ/g, '0x152');
        cadena = cadena.replace(/Ö/g, '0x153');
        cadena = cadena.replace(/Ü/g, '0x154');
        cadena = cadena.replace(/¢/g, '0x155');
        cadena = cadena.replace(/£/g, '0x156');
        cadena = cadena.replace(/¥/g, '0x157');
        cadena = cadena.replace(/₧/g, '0x158');
        cadena = cadena.replace(/ƒ/g, '0x159');
        cadena = cadena.replace(/á/g, '0x160');
        cadena = cadena.replace(/í/g, '0x161');
        cadena = cadena.replace(/ó/g, '0x162');
        cadena = cadena.replace(/ú/g, '0x163');
        cadena = cadena.replace(/ñ/g, '0x164');
        cadena = cadena.replace(/Ñ/g, '0x165');
        cadena = cadena.replace(/ª/g, '0x166');
        cadena = cadena.replace(/º/g, '0x167');
        cadena = cadena.replace(/¿/g, '0x168');
        cadena = cadena.replace(/⌐/g, '0x169');
        cadena = cadena.replace(/¬/g, '0x170');
        cadena = cadena.replace(/½/g, '0x171');
        cadena = cadena.replace(/¼/g, '0x172');
        cadena = cadena.replace(/¡/g, '0x173');
        cadena = cadena.replace(/«/g, '0x174');
        cadena = cadena.replace(/»/g, '0x175');
        cadena = cadena.replace(/░/g, '0x176');
        cadena = cadena.replace(/▒/g, '0x177');
        cadena = cadena.replace(/▓/g, '0x178');
        cadena = cadena.replace(/│/g, '0x179');
        cadena = cadena.replace(/┤/g, '0x180');
        cadena = cadena.replace(/╡/g, '0x181');
        cadena = cadena.replace(/╢/g, '0x182');
        cadena = cadena.replace(/╖/g, '0x183');
        cadena = cadena.replace(/╕/g, '0x184');
        cadena = cadena.replace(/╣/g, '0x185');
        cadena = cadena.replace(/║/g, '0x186');
        cadena = cadena.replace(/╗/g, '0x187');
        cadena = cadena.replace(/╝/g, '0x188');
        cadena = cadena.replace(/╜/g, '0x189');
        cadena = cadena.replace(/╛/g, '0x190');
        cadena = cadena.replace(/┐/g, '0x191');
        cadena = cadena.replace(/└/g, '0x192');
        cadena = cadena.replace(/┴/g, '0x193');
        cadena = cadena.replace(/┬/g, '0x194');
        cadena = cadena.replace(/├/g, '0x195');
        cadena = cadena.replace(/─/g, '0x196');
        cadena = cadena.replace(/┼/g, '0x197');
        cadena = cadena.replace(/╞/g, '0x198');
        cadena = cadena.replace(/╟/g, '0x199');
        cadena = cadena.replace(/╚/g, '0x200');
        cadena = cadena.replace(/╔/g, '0x201');
        cadena = cadena.replace(/╩/g, '0x202');
        cadena = cadena.replace(/╦/g, '0x203');
        cadena = cadena.replace(/╠/g, '0x204');
        cadena = cadena.replace(/═/g, '0x205');
        cadena = cadena.replace(/╬/g, '0x206');
        cadena = cadena.replace(/╧/g, '0x207');
        cadena = cadena.replace(/╨/g, '0x208');
        cadena = cadena.replace(/╤/g, '0x209');
        cadena = cadena.replace(/╥/g, '0x210');
        cadena = cadena.replace(/╙/g, '0x211');
        cadena = cadena.replace(/Ô/g, '0x212');
        cadena = cadena.replace(/╒/g, '0x213');
        cadena = cadena.replace(/╓/g, '0x214');
        cadena = cadena.replace(/╫/g, '0x215');
        cadena = cadena.replace(/╪/g, '0x216');
        cadena = cadena.replace(/┘/g, '0x217');
        cadena = cadena.replace(/┌/g, '0x218');
        cadena = cadena.replace(/█/g, '0x219');
        cadena = cadena.replace(/▄/g, '0x220');
        cadena = cadena.replace(/▌/g, '0x221');
        cadena = cadena.replace(/▐/g, '0x222');
        cadena = cadena.replace(/▀/g, '0x223');
        cadena = cadena.replace(/α/g, '0x224');
        cadena = cadena.replace(/ß/g, '0x225');
        cadena = cadena.replace(/Γ/g, '0x226');
        cadena = cadena.replace(/π/g, '0x227');
        cadena = cadena.replace(/Σ/g, '0x228');
        cadena = cadena.replace(/σ/g, '0x229');
        cadena = cadena.replace(/µ/g, '0x230');
        cadena = cadena.replace(/τ/g, '0x231');
        cadena = cadena.replace(/Φ/g, '0x232');
        cadena = cadena.replace(/Θ/g, '0x233');
        cadena = cadena.replace(/Ω/g, '0x234');
        cadena = cadena.replace(/δ/g, '0x235');
        cadena = cadena.replace(/∞/g, '0x236');
        cadena = cadena.replace(/φ/g, '0x237');
        cadena = cadena.replace(/ε/g, '0x238');
        cadena = cadena.replace(/∩/g, '0x239');
        cadena = cadena.replace(/≡/g, '0x240');
        cadena = cadena.replace(/±/g, '0x241');
        cadena = cadena.replace(/≥/g, '0x242');
        cadena = cadena.replace(/≤/g, '0x243');
        cadena = cadena.replace(/⌠/g, '0x244');
        cadena = cadena.replace(/⌡/g, '0x245');
        cadena = cadena.replace(/÷/g, '0x246');
        cadena = cadena.replace(/≈/g, '0x247');
        cadena = cadena.replace(/≈/g, '0x248');
        cadena = cadena.replace(/∙/g, '0x249');
        cadena = cadena.replace(/·/g, '0x250');
        cadena = cadena.replace(/√/g, '0x251');
        cadena = cadena.replace(/ⁿ/g, '0x252');
        cadena = cadena.replace(/²/g, '0x253');
        cadena = cadena.replace(/■/g, '0x254');
        return cadena;
    }

    $.urlParam = function (name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }

})(jQuery);