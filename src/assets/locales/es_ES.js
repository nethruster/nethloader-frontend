const locale = { // eslint-disable-line no-unused-vars
  "header_nav": {
    "about_nethloader": "Acerca de Nethloader",
    "login": "Iniciar sesión",
    "logout": "Cerrar sesión",
    "cp": "Panel de Control"
  },
  "home": {
    "intro": "Este dominio usa Nethloader, un servicio personal para compartir contenido multimedia.",
    "buttons": {
      "more_info": "Más info.",
      "source_code": "GitHub"
    }
  },
  "login": {
    "title": "Iniciar sesión",
    "form": {
      "email": "Correo electrónico",
      "password": "Contraseña",
      "login": "Iniciar sesión"
    },
    "forgot_password": "He olvidado mi contraseña",
    "not_registered": "No tengo una cuenta"
  },
  "register": {
    "title": "Crea una cuenta",
    "form": {
      "username": "Nombre de usuario",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "password_confirm": "Vuelve a escribir la contraseña",
      "register": "Registrarme",
      "validation": {
        "empty": "Este campo está vacío",
        "invalid_email": "Los correos electronicos deben incluir '@' y contener un dominio",
        "invalid_username": "Los nombres de usuario sólo deben contener caracteres alfanumericos",
        "unequal_passwords": "Las contraseñas no coinciden, asegurate de que son iguales",
        "valid": "Válido"
      }
    },
    "has_account": "Ya tengo una cuenta"
  },
  "media_view": {
    "buttons": {
      "download": "Descargar archivo",
      "view_original": "Abrir imagen original en una pestaña nueva"
    },
    "toolbar": {
      "hide_controls": "Esconder controles",
      "show_controls": "Mostrar controles"
    }
  },
  "cp": {
    "admin": {
      "users": {
        "user_load_error": "No se pudieron cargar usuarios :(. Comprueba la consola.",
        "table": {
          "title_name": "Nombre",
          "title_email": "Email"
        },
        "action_modals": {
          "title": "Eliminar usuarios",
          "single_delete": "Estás seguro de que quieres eliminar el usuario seleccionado?",
          "multiple_delete": "usuarios van a ser eliminados, estás seguro de que quieres continuar?",
          "cancel": "No, espera",
          "accept": "Adelante"
        },
        "user": {
          "table": {
            "is_admin": "Admin."
          },
          "buttons": {
            "copy_apikey": "Copiar APIKey",
            "apikey_copied": "Copiada!",
            "edit_user": "Editar usuario",
            "delete_user_media": "Borrar archivos",
            "delete_user": "Eliminar",
            "delete_user_media_modal": {
              "title": "Eliminar archivos de usuario",
              "button_accept": "Adelante",
              "button_deny": "No, espera",
              "text_info": "Esto va a borrar TODOS los archivos subidos por este usuario.",
              "text_warning": "NO SE PUEDE DESHACER."
            },
            "edit_user_modal": {
              "title": "Editar usuario",
              "close": "Cerrar",
              "form": {
                "username": {
                  "title": "Nombre de usuario",
                  "empty": "Este campo está vacio",
                  "only_aplhanum": "Solamente caracteres alfanumericos",
                  "valid": "Guay! Este nombre es válido",
                  "submit_error": "Este nombre no es válido"
                },
                "email": {
                  "title": "Email",
                  "empty": "Este campo está vacio",
                  "invalid": "Los emails incluyen '@' y un dominio",
                  "valid": "Bien! Este email es válido",
                  "submit_error": "Este email no es válido"
                },
                "password": {
                  "title": "Contraseña",
                  "empty": "Este campo está vacio",
                  "submit_error": "El campo está vacio",
                  "placeholder": "Tu la sabes? Nosotros no."
                },
                "administrator": "Administrador",
                "regen_apikey": "Regenerar APIkey"
              },
              "toask_ok": "OK",
              "current_apikey": "APIKey actual"
            }
          }
        },
        "toolbar": {
          "add_user_modal": {
            "title": "Crear nuevo usuario",
            "cancel": "Cancelar",
            "accept": "Crear",
            "form": {
              "email": {
                "title": "Email",
                "invalid": "Los emails incluyen '@' y un dominio"
              },
              "username": {
                "title": "Nombre de usuario",
                "only_aplhanum": "Solamente caracteres alfanumericos"
              },
              "password": {
                "title": "Contraseña"
              },
              "valid": "Válido",
              "empty": "Este campo está vacio",
              "empty_fields": "Por favor, rellena todos los campos",
              "make_admin": "Hacer administrador"
            },
            "toast_ok": "OK"
          }
        }
      }
    },
    "subheader": {
      "media_items": "archivos",
      "tabs": {
        "overview": "Resumen",
        "settings": "Ajustes",
        "admin_settings": "Admin"
      }
    },
    "overview": {
      "no_page": "Esta página no existe",
      "go_to_first_page": "Ir a la primera página",
      "go_to_previous_page": "Ir a la página anterior",
      "filters": {
        "title": "Filtrar archivos",
        "form": {
          "type": "Tipo",
          "date_interval": "Intervalo de fechas",
          "after": "Después",
          "before": "Antes",
          "both": "Ambos",
          "image_gif": "Imagen",
          "video": "Video/gif",
          "results_per_page": "Resultados por página",
          "all": "Todo",
          "reset_fields": "Reestablecer filtros",
          "submit": "Filtrar"
        }
      },
      "uploads": {
        "no_media": "No se han encontrado archivos",
        "no_filtered_media": "Los filtros no han producido resultados",
        "add_media_description": "Arrastra archivos aquí o haz clic en el boton 'Subir' para añadir archivos.",
        "upload": {
          "type": "Tipo",
          "uploaded": "Subido",
          "at": "El",
          "download": "Descargar",
          "copy_url": "Copiar URL",
          "delete": "Eliminar",
          "copied": "Copiada!"
        },
        "modals": {
          "title": "Eliminar archivos",
          "confirm_single_delete": "¿Estás seguro de que quieres eliminar el elemento selecconado?",
          "confirm_multiple_delete": "elementos van a ser eliminados, estás seguro de que deseas proceder?",
          "confirm": "Si, hazlo",
          "deny": "No, espera"
        },
        "pagination": {
          "page": "Pág.",
          "first_page": "Primera pág.",
          "last_page": "Última pág.",
          "previous_page": "Pág. anterior",
          "next_page": "Pág. siguiente"
        }
      }
    },
    "settings": {
      "sidebar": {
        "title": "Subir des de software",
        "description": "Puedes integrar Nethloader con servicios de 3ros y software usando una APIKey con la que se pueden subir archivos a esta cuenta.",
        "nav_links": {
          "sharex": {
            "title": "ShareX",
            "description": "Una aplicación gratuita para windows que funciona genial con Nethloader."
          },
          "curl": {
            "title": "cURL y otros",
            "description": "También es posible subir archivos suando cUrl des de tu terminal en Mac o Linux."
          },
          "click_to_read": "Haz clic para ver guia"
        },
        "api_key": {
          "title": "Tu APIKey",
          "apikey_copied": "Copiada!",
          "copy_apikey": "Copiar",
          "no_auth_security_warning": "Esta llave se puede usar para subir archivos a esta cuenta directamente y sin autentificación, ten cuidado con ella.",
          "compromised_apikey_info": "Si tu APIkey resulta comprometida, siempre puedes volver aquí y renovarla para obtener una nueva."
        },
        "partials": {
          "sharex": {
            "description": "Nethloader es compatible con ShareX (aplicación de Windows). Esta es una aplicación gratuita y avanzada para tomar capturas y grabaciones de pantalla y a su vez hacer el proceso de compartir fácil.",
            "instructions_title": "Para configurar ShareX con Nethloader, sigue estas instrucciones",
            "instructions": {
              "step_1": "Abre ShareX y escoge 'destinations' en la parte izquierda de la ventana",
              "step_2": "Escoge 'destination settings'",
              "step_3": "Haz scroll hacia abajo en la lista de la izquierda y seleccina 'Custom uploaders'",
              "step_4": "Haz clic en el botón 'Import' y selecciona 'From URL...'",
              "step_5": "Pega la url mostrada debajo de las instrucciones y haz clic en OK",
              "step_6": "Comprueba que el 'uploader' seleccionado es 'Nethloader' y cierra la ventana",
              "step_7": "En la ventana principal selecciona 'destinations' en la parte izquierda de la misma, entonces selecciona 'image uploader' y haz clic en 'Custom image uploader'"
            },
            "autoconfig_copied": "Copiado!",
            "copy_autoconfig": "Copiar",
            "autoconfigure_security_warning": "Esta url se usa para auto-configurar ShareX para subir archivos a esta cuenta directamente y sin autentificación, no la compartas."
          },
          "curl": {
            "description": "Puedes subir archivos usando cURL des de tu terminal en Mac y Linux.",
            "usage_description": "Usa el comando proporcionado debajo escogiendo tu archivo cambiando",
            "command_copied": "Copiado!",
            "copy_command": "Copiar",
            "terminal_hostname": "nethloader_pc"
          }
        }
      },
      "settings_grid": {
        "sections": {
          "username": {
            "title": "Cambiar nombre de usuario",
            "description": "Nombre de usuario actual"
          },
          "password": {
            "title": "Cambiar contraseña",
            "description": "Ese es tu secreto, lo pondriamos aquí si lo supieramos."
          },
          "email": {
            "title": "Cambiar email",
            "description": "Email actual"
          },
          "apikey_regen": {
            "title": "Renovar APIKey",
            "description": "Generar una APIKey nueva. Esto va a reemplazar la que ya tienes."
          },
          "user_media_remove": {
            "title": "Eliminar mis archivos",
            "description": "Eliminar todas tus imagenes y videos.",
            "items": "archivos"
          },
          "account_remove": {
            "title": "Borrar cuenta",
            "description": "Borrar esta cuenta y todos sus archivos. (Para siempre!)"
          },
          "dark_mode": {
            "title": "Cambiar modo oscuro",
            "description": "Conviértete en un ser nocturno o reestableze el glorioso blanco."
          }
        },
        "partials": {
          "username": {
            "title": "Cambiar nombre de usuario",
            "form": {
              "emtpy": "Este campo está vacio",
              "only_aplhanum": "Los nombres de usuario deben contener solamente caracteres alfanumericos",
              "valid": "Guay! Este nombre de usuario es válido",
              "submit_error": "Ese nombre no es válido",
              "placeholder": "Nuevo nombre de usuario"
            },
            "accept": "Cambiar",
            "cancel": "Cancelar",
            "toast_ok": "OK"
          },
          "email": {
            "title": "Cambiar email",
            "form": {
              "emtpy": "Este campo está vacio",
              "invalid": "Los emails incluyen '@' y un dominio",
              "valid": "Bien! Este email es válido",
              "submit_error": "Este email no es válido",
              "placeholder": "Nuevo email"
            },
            "accept": "Cambiar",
            "cancel": "Cancelar",
            "toast_ok": "OK"
          },
          "password": {
            "title": "Cambiar contraseña",
            "form": {
              "emtpy": "Este campo está vacio",
              "invalid": "Las contraseñas no coinciden, asegurate de que son iguales",
              "valid": "Válido",
              "submit_error": "Por favor, rellena todos los campos",
              "placeholder_current_password": "Contraseña actual",
              "placeholder_new_password": "Nueva contraseña",
              "placeholder_new_password_check": "Repite nueva contraseña"
            },
            "accept": "Cambiar",
            "cancel": "Cancelar",
            "toast_ok": "OK"
          },
          "apikey": {
            "title": "Regenerar APIKey",
            "cancel": "No, espera",
            "accept": "Regenerar",
            "description": "Cualquier aplicación configurada con tu APIKey actual dejará de funcionar después de esto.",
            "warning": "NO SE PUEDE DESHACER."
          },
          "delete_user_media": {
            "title": "Borrar mis archivos",
            "cancel": "No, espera",
            "accept": "Adelante",
            "description": "Esto va a borrar TODOS los archivos que hayas subido desde que creaste la cuenta.",
            "warning": "NO SE PUEDE DESHACER.",
            "toast_ok": "OK",
            "incorrect_password": "Contraseña incorrecta",
            "empty_password": "Por favor, escribe tu contraseña",
            "type_password_to_confirm": "Escribe tu contraseña para continuar"
          },
          "account_remove": {
            "title": "Borrar cuenta",
            "cancel": "Espera, no",
            "accept": "Adelante",
            "description": "Esto va a eliminar TODOS los archivos Y tu cuenta, que ya no serán accesibles a posteriori.",
            "warning": "NO SE PUEDE DESHACER.",
            "toast_ok": "OK",
            "incorrect_password": "Contraseña incorrecta",
            "empty_password": "Por favor, escribe tu contraseña",
            "type_password_to_confirm": "Escribe tu contraseña para continuar"
          }
        }
      }
    }
  },
  "footer": {
    "version": "Version",
    "login": "Iniciar Sesión",
    "powered_by": ""
  },
  "shared": {
    "modal": {
      "close": "Cerrar"
    },
    "upload_media": {
      "supported_files": "Archivos soportados",
      "trigger_button": "Subir",
      "invalid_file_detected": "Archivo inválido detectado",
      "response": {
        "no_files": "No se han seleccionado elementos",
        "error": "Algo ha ido mal"
      },
      "input": {
        "text": "Haz clic para añadir archivos o arrastralos aqui",
        "files_text": "Haz clic para añadir más archivos o arrastralos aqui",
        "uploading_file": "Subiendo archivo",
        "files_selected": "archivos seleccionados",
        "upload_submit": "Subir"
      },
      "toasts": {
        "ok": "OK",
        "invalid_files": "Archivos inválidos detectados",
        "added": "Se ha añadido",
        "file": "archivo",
        "files": "archivos"
      }
    },
    "not_found": {
      "title": "Lo sentimos, no hemos podido encontrar eso...",
      "contact_admin": "Si algo deberia estar aquí, contacta con un administrador."
    }
  }
}
