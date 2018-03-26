const locale = { // eslint-disable-line no-unused-vars
  'header_nav': {
    'about_nethloader': 'About Nethloader',
    'login': 'Login',
    'logout': 'Logout',
    'cp': 'Control Panel'
  },
  'home': {
    'intro': 'This domain is using Nethloader, a self hosted media sharing service.',
    'buttons': {
      'more_info': 'More Info',
      'source_code': 'GitHub'
    }
  },
  'login': {
    'title': 'Login',
    'form': {
      'email': 'Email',
      'password': 'Password',
      'login': 'Login'
    },
    'forgot_password': 'I forgot my password',
    'not_registered': "I don't have an account"
  },
  'register': {
    'title': 'Create an account',
    'form': {
      'username': 'Username',
      'email': 'Email',
      'password': 'Password',
      'password_confirm': 'Retype Password',
      'register': 'Register',
      'validation': {
        'empty': 'This field is empty',
        'invalid_email': "Emails must include '@' and a domain name",
        'invalid_username': 'Usernames must only contain alphanumeric characters',
        'unequal_passwords': "Password fields don't match, make sure they are the same",
        'valid': 'Valid'
      }
    },
    'has_account': 'I already have an account'
  },
  'media_view': {
    'buttons': {
      'download': 'Download media',
      'view_original': 'Open original image in a new tab'
    },
    'toolbar': {
      'hide_controls': 'Hide controls',
      'show_controls': 'Show controls'
    }
  },
  'cp': {
    'admin': {
      'users': {
        'title': 'Users',
        'user_load_error': "Couldn't load users :(. Check the console.",
        'table': {
          'title_name': 'Name',
          'title_email': 'Email'
        },
        'action_modals': {
          'title': 'Delete users',
          'single_delete': 'Are you sure that you want to delete the selected user?',
          'multiple_delete': 'users are about to be deleted, are you sure that you want to proceed?',
          'cancel': 'Wait, no',
          'accept': 'I know, proceed'
        },
        'user': {
          'table': {
            'is_admin': 'Admin'
          },
          'buttons': {
            'copy_apikey': 'Copy APIKey',
            'apikey_copied': 'Copied!',
            'edit_user': 'Edit user',
            'delete_user_media': 'Delete media',
            'delete_user': 'Delete',
            'delete_user_media_modal': {
              'title': 'Delete user media',
              'button_accept': 'I know, proceed',
              'button_deny': 'Wait, no',
              'text_info': 'This will delete ALL media uploaded by this user.',
              'text_warning': 'IT CANNOT BE UNDONE.'
            },
            'edit_user_modal': {
              'title': 'Edit user',
              'close': 'Close',
              'form': {
                'username': {
                  'title': 'Username',
                  'empty': 'This field is empty',
                  'only_aplhanum': 'Only alphanumeric characters',
                  'valid': 'Cool! This username is valid',
                  'submit_error': "That's not a valid username"
                },
                'email': {
                  'title': 'Email',
                  'empty': 'This field is empty',
                  'invalid': "Emails include '@' and a domain",
                  'valid': 'Nice! This email is valid',
                  'submit_error': "That's not a valid email"
                },
                'password': {
                  'title': 'Password',
                  'empty': 'This field is empty',
                  'submit_error': "That's an empty password",
                  'placeholder': "Do you know it? We don't."
                },
                'administrator': 'Administrator',
                'regen_apikey': 'Regen APIKey'
              },
              'toask_ok': 'OK',
              'current_apikey': 'Current APIKey'
            }
          }
        },
        'toolbar': {
          'add_user_modal': {
            'title': 'Create new user',
            'cancel': 'Cancel',
            'accept': 'Create',
            'form': {
              'email': {
                'title': 'Email',
                'invalid': "Emails include '@' and a domain"
              },
              'username': {
                'title': 'Username',
                'only_aplhanum': 'Only alphanumeric characters'
              },
              'password': {
                'title': 'Password'
              },
              'valid': 'Valid',
              'empty': 'This field is empty',
              'empty_fields': 'Please, fill in all the fields',
              'make_admin': 'Make administrator'
            },
            'toast_ok': 'OK'
          }
        }
      }
    },
    'subheader': {
      'media_items': 'media items',
      'tabs': {
        'overview': 'Overview',
        'settings': 'Settings',
        'admin_settings': 'Admin'
      }
    },
    'overview': {
      'no_page': "This page doesn't exist",
      'go_to_first_page': 'Go to first page',
      'go_to_previous_page': 'Go to previous page',
      'filters': {
        'title': 'Filter media',
        'form': {
          'type': 'Type',
          'date_interval': 'Date interval',
          'after': 'After',
          'before': 'Before',
          'both': 'Both',
          'image_gif': 'Image',
          'video': 'Video/gif',
          'results_per_page': 'Results per page',
          'all': 'All',
          'reset_fields': 'Reset filters',
          'submit': 'Filter'
        }
      },
      'uploads': {
        'no_media': 'No media found',
        'no_filtered_media': "The filters didn't produce any results",
        'add_media_description': "Drop files anywhere or click the 'Upload' button to add media.",
        'upload': {
          'type': 'Type',
          'uploaded': 'Uploaded',
          'at': 'At',
          'download': 'Download',
          'copy_url': 'Copy URL',
          'delete': 'Delete',
          'copied': 'Copied!'
        },
        'modals': {
          'title': 'Delete files',
          'confirm_single_delete': 'Are you sure that you want to delete the selected item?',
          'confirm_multiple_delete': 'items are about to be deleted, are you sure that you want to proceed?',
          'confirm': 'Yes, do it',
          'deny': 'Wait, no'
        },
        'pagination': {
          'page': 'Page',
          'first_page': 'First page',
          'last_page': 'Last page',
          'previous_page': 'Prev page',
          'next_page': 'Next page'
        }
      }
    },
    'settings': {
      'sidebar': {
        'title': 'Uploading from software',
        'description': 'Nethloader can be integrated with 3rd party services and software using an APIkey by which you can upload images to this account.',
        'nav_links': {
          'sharex': {
            'title': 'ShareX',
            'description': 'A free application for windows which works great when used with Nethloader.'
          },
          'curl': {
            'title': 'cURL and others',
            'description': "It's also possible to upload files using cURL from your terminal on Mac and Linux systems."
          },
          'click_to_read': 'Click to read guide'
        },
        'api_key': {
          'title': 'Your APIKey',
          'apikey_copied': 'Copied!',
          'copy_apikey': 'Copy',
          'no_auth_security_warning': 'This key can be used to upload media to this account directly and without authentication, be careful with it.',
          'compromised_apikey_info': 'If your APIkey gets compromised, you can always come back here and renew it to get a new one.'
        },
        'partials': {
          'sharex': {
            'description': 'Nethloader is compatible with ShareX (Windows only application). It is an advanced and free application to take screenshots and record the screen while making the process of sharing easy.',
            'instructions_title': ' To set up ShareX in with Nethloader, follow these instructions',
            'instructions': {
              'step_1': "Open ShareX and choose 'destinations' on the left hand side of the window",
              'step_2': "Choose 'destination settings'",
              'step_3': "Scroll down in the list on the left and select 'Custom uploaders'",
              'step_4': "Click the 'Import' button and select 'From URL...'",
              'step_5': 'Paste the url shown below these instructions and click OK',
              'step_6': "Check and see if the selected image uploader is 'Nethloader' and close the window",
              'step_7': "In the main window of ShareX select destinations on the left hand side of the window, then select image uploader and click on 'Custom image uploader'"
            },
            'autoconfig_copied': 'Copied!',
            'copy_autoconfig': 'Copy link',
            'autoconfigure_security_warning': 'This url is used to auto-configure ShareX to upload media to this account directly and without authentication, do not share it.'
          },
          'curl': {
            'description': 'You can upload files using cURL from your terminal on Mac and Linux.',
            'usage_description': 'Use the command provided below choosing your desired file by changing',
            'command_copied': 'Copied!',
            'copy_command': 'Copy',
            'terminal_hostname': 'nethloader_pc'
          }
        }
      },
      'settings_grid': {
        'sections': {
          'username': {
            'title': 'Change username',
            'description': 'Current username'
          },
          'password': {
            'title': 'Change password',
            'description': "That's your secret, we'd put it here if we knew."
          },
          'email': {
            'title': 'Change email',
            'description': 'Current email'
          },
          'apikey_regen': {
            'title': 'Renew APIKey',
            'description': 'Generate a new APIKey. This will replace your current one.'
          },
          'user_media_remove': {
            'title': 'Delete my media',
            'description': 'Delete all your images and videos.',
            'items': 'items'
          },
          'account_remove': {
            'title': 'Delete account',
            'description': 'Delete this account and all its media. (Forever!)'
          },
          'dark_mode': {
            'title': 'Toggle dark mode',
            'description': 'Be a night owl or restore the glorious white.'
          }
        },
        'partials': {
          'username': {
            'title': 'Change username',
            'form': {
              'emtpy': 'This field is empty',
              'only_aplhanum': 'Usernames must only contain alphanumeric characters',
              'valid': 'Cool! This username is valid',
              'submit_error': "That's not a valid username",
              'placeholder': 'New username'
            },
            'accept': 'Change',
            'cancel': 'Cancel',
            'toast_ok': 'OK'
          },
          'email': {
            'title': 'Change email',
            'form': {
              'emtpy': 'This field is empty',
              'invalid': "Emails must include '@' and a domain name",
              'valid': 'Nice! This email is valid',
              'submit_error': "That's not a valid email",
              'placeholder': 'New email'
            },
            'accept': 'Change',
            'cancel': 'Cancel',
            'toast_ok': 'OK'
          },
          'password': {
            'title': 'Change password',
            'form': {
              'emtpy': 'This field is empty',
              'invalid': "Password fields don't match, make sure they are the same",
              'valid': 'Valid',
              'submit_error': 'Please, fill in all the fields',
              'placeholder_current_password': 'Current password',
              'placeholder_new_password': 'New password',
              'placeholder_new_password_check': 'Retype new password'
            },
            'accept': 'Change',
            'cancel': 'Cancel',
            'toast_ok': 'OK'
          },
          'apikey': {
            'title': 'Regenerate APIKey',
            'cancel': 'Wait, no',
            'accept': 'Regenerate',
            'description': 'Any app set up with your current key will stop working after this.',
            'warning': 'THIS CANNOT BE UNDONE.'
          },
          'delete_user_media': {
            'title': 'Delete my media',
            'cancel': 'Wait, no',
            'accept': 'I know, proceed',
            'description': 'This will delete ALL your uploaded media since you created the account.',
            'warning': 'IT CANNOT BE UNDONE.',
            'toast_ok': 'OK',
            'incorrect_password': 'Incorrect password',
            'empty_password': 'Please, type in your password',
            'type_password_to_confirm': 'Please type in your password to confirm'
          },
          'account_remove': {
            'title': 'Delete account',
            'cancel': 'Wait, no',
            'accept': 'I know, proceed',
            'description': 'This will delete ALL your uploaded media AND your account, which will be innaccesible thereafter.',
            'warning': 'IT CANNOT BE UNDONE.',
            'toast_ok': 'OK',
            'incorrect_password': 'Incorrect password',
            'empty_password': 'Please, type in your password',
            'type_password_to_confirm': 'Please type in your password to confirm'
          }
        }
      }
    }
  },
  'footer': {
    'version': 'Version',
    'login': 'Login',
    'powered_by': 'Powered by'
  },
  'shared': {
    'modal': {
      'close': 'Close'
    },
    'upload_media': {
      'supported_files': 'Supported files',
      'trigger_button': 'Upload',
      'invalid_file_detected': 'Detected invalid file type',
      'response': {
        'no_files': 'No files selected',
        'error': 'Something went wrong'
      },
      'input': {
        'text': 'Click to add files or drop them anywhere',
        'files_text': 'Click to add more files or drop them anywhere',
        'uploading_file': 'Uploading file',
        'files_selected': 'files selected',
        'upload_submit': 'Upload'
      },
      'toasts': {
        'ok': 'OK',
        'invalid_files': 'Invalid files detected',
        'added': 'Added',
        'file': 'file',
        'files': 'files'
      }
    },
    'not_found': {
      'title': 'Sorry, we couldn\'t find that...',
      'contact_admin': 'If something should be here, contact with an administrator.'
    }
  }
}
