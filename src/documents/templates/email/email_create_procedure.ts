type Params = {
  citizen_full_name: string;
  procedure_number: string;
  link: string;
  created_at_format: string;
};
export const email_create_procedure = ({
  citizen_full_name,
  procedure_number,
  link,
  created_at_format,
}: Params) => `
<html
  dir="ltr"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta content="telephone=no" name="format-detection" />
    <title></title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9
      ]><style>
        sup {
          font-size: 100% !important;
        }
      </style><!
    [endif]-->
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
      rel="stylesheet"
    />
    <style class="esdev-css">
      /* CONFIG STYLES Please do not delete and edit CSS styles below */
      /* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
      #outlook a {
        padding: 0;
      }
      .es-button {
        mso-style-priority: 100 !important;
        text-decoration: none !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      .es-desk-hidden {
        display: none;
        float: left;
        overflow: hidden;
        width: 0;
        max-height: 0;
        line-height: 0;
        mso-hide: all;
      }
      [data-ogsb] .es-button.es-button-1717367029864 {
        padding: 15px 55px !important;
      }
      /*
END OF IMPORTANT
*/
      body {
        width: 100%;
        font-family: "Roboto Flex", arial, "helvetica neue", helvetica,
          sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse;
        border-spacing: 0px;
      }
      table td,
      body,
      .es-wrapper {
        padding: 0;
        margin: 0;
      }
      .es-content,
      .es-header,
      .es-footer {
        table-layout: fixed !important;
        width: 100%;
      }
      img {
        display: block;
        border: 0;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      p,
      hr {
        margin: 0;
      }
      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 0;
        line-height: 120%;
        mso-line-height-rule: exactly;
        font-family: "Roboto Flex", arial, "helvetica neue", helvetica,
          sans-serif;
      }
      p,
      ul li,
      ol li,
      a {
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
        mso-line-height-rule: exactly;
      }
      .es-left {
        float: left;
      }
      .es-right {
        float: right;
      }
      .es-p5 {
        padding: 5px;
      }
      .es-p5t {
        padding-top: 5px;
      }
      .es-p5b {
        padding-bottom: 5px;
      }
      .es-p5l {
        padding-left: 5px;
      }
      .es-p5r {
        padding-right: 5px;
      }
      .es-p10 {
        padding: 10px;
      }
      .es-p10t {
        padding-top: 10px;
      }
      .es-p10b {
        padding-bottom: 10px;
      }
      .es-p10l {
        padding-left: 10px;
      }
      .es-p10r {
        padding-right: 10px;
      }
      .es-p15 {
        padding: 15px;
      }
      .es-p15t {
        padding-top: 15px;
      }
      .es-p15b {
        padding-bottom: 15px;
      }
      .es-p15l {
        padding-left: 15px;
      }
      .es-p15r {
        padding-right: 15px;
      }
      .es-p20 {
        padding: 20px;
      }
      .es-p20t {
        padding-top: 20px;
      }
      .es-p20b {
        padding-bottom: 20px;
      }
      .es-p20l {
        padding-left: 20px;
      }
      .es-p20r {
        padding-right: 20px;
      }
      .es-p25 {
        padding: 25px;
      }
      .es-p25t {
        padding-top: 25px;
      }
      .es-p25b {
        padding-bottom: 25px;
      }
      .es-p25l {
        padding-left: 25px;
      }
      .es-p25r {
        padding-right: 25px;
      }
      .es-p30 {
        padding: 30px;
      }
      .es-p30t {
        padding-top: 30px;
      }
      .es-p30b {
        padding-bottom: 30px;
      }
      .es-p30l {
        padding-left: 30px;
      }
      .es-p30r {
        padding-right: 30px;
      }
      .es-p35 {
        padding: 35px;
      }
      .es-p35t {
        padding-top: 35px;
      }
      .es-p35b {
        padding-bottom: 35px;
      }
      .es-p35l {
        padding-left: 35px;
      }
      .es-p35r {
        padding-right: 35px;
      }
      .es-p40 {
        padding: 40px;
      }
      .es-p40t {
        padding-top: 40px;
      }
      .es-p40b {
        padding-bottom: 40px;
      }
      .es-p40l {
        padding-left: 40px;
      }
      .es-p40r {
        padding-right: 40px;
      }
      .es-menu td {
        border: 0;
      }
      .es-menu td a img {
        display: inline-block !important;
        vertical-align: middle;
      }
      /*
END CONFIG STYLES
*/
      s {
        text-decoration: line-through;
      }
      p,
      ul li,
      ol li {
        font-family: "Roboto Flex", arial, "helvetica neue", helvetica,
          sans-serif;
        line-height: 150%;
      }
      ul li,
      ol li {
        margin-bottom: 15px;
        margin-left: 0;
      }
      a {
        text-decoration: underline;
      }
      .es-menu td a {
        text-decoration: none;
        display: block;
        font-family: "Roboto Flex", arial, "helvetica neue", helvetica,
          sans-serif;
      }
      .es-wrapper {
        width: 100%;
        height: 100%;
        background-repeat: repeat;
        background-position: center top;
      }
      .es-wrapper-color,
      .es-wrapper {
        background-color: #f6f6f6;
      }
      .es-header {
        background-color: transparent;
        background-repeat: repeat;
        background-position: center top;
      }
      .es-header-body {
        background-color: #ffffff;
      }
      .es-header-body p,
      .es-header-body ul li,
      .es-header-body ol li {
        color: #333333;
        font-size: 14px;
      }
      .es-header-body a {
        color: #2cb543;
        font-size: 14px;
      }
      .es-content-body {
        background-color: #ffffff;
      }
      .es-content-body p,
      .es-content-body ul li,
      .es-content-body ol li {
        color: #333333;
        font-size: 14px;
      }
      .es-content-body a {
        color: #2cb543;
        font-size: 14px;
      }
      .es-footer {
        background-color: transparent;
        background-repeat: repeat;
        background-position: center top;
      }
      .es-footer-body {
        background-color: #ffffff;
      }
      .es-footer-body p,
      .es-footer-body ul li,
      .es-footer-body ol li {
        color: #333333;
        font-size: 14px;
      }
      .es-footer-body a {
        color: #2cb543;
        font-size: 14px;
      }
      .es-infoblock,
      .es-infoblock p,
      .es-infoblock ul li,
      .es-infoblock ol li {
        line-height: 120%;
        font-size: 12px;
        color: #cccccc;
      }
      .es-infoblock a {
        font-size: 12px;
        color: #cccccc;
      }
      h1 {
        font-size: 30px;
        font-style: normal;
        font-weight: normal;
        color: #333333;
      }
      h2 {
        font-size: 24px;
        font-style: normal;
        font-weight: normal;
        color: #333333;
      }
      h3 {
        font-size: 20px;
        font-style: normal;
        font-weight: normal;
        color: #333333;
      }
      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 30px;
      }
      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 24px;
      }
      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 20px;
      }
      a.es-button,
      button.es-button {
        padding: 10px 20px 10px 20px;
        display: inline-block;
        background: #31cb4b;
        border-radius: 30px;
        font-size: 18px;
        font-family: "Roboto Flex", arial, "helvetica neue", helvetica,
          sans-serif;
        font-weight: normal;
        font-style: normal;
        line-height: 120%;
        color: #ffffff;
        text-decoration: none;
        width: auto;
        text-align: center;
        mso-padding-alt: 0;
        mso-border-alt: 10px solid #31cb4b;
      }
      .es-button-border {
        border-style: solid solid solid solid;
        border-color: #2cb543 #2cb543 #2cb543 #2cb543;
        background: #31cb4b;
        border-width: 0px 0px 2px 0px;
        display: inline-block;
        border-radius: 30px;
        width: auto;
      }
      /* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */
      @media only screen and (max-width: 600px) {
        p,
        ul li,
        ol li,
        a {
          line-height: 150% !important;
        }
        h1,
        h2,
        h3,
        h1 a,
        h2 a,
        h3 a {
          line-height: 120% !important;
        }
        h1 {
          font-size: 30px !important;
          text-align: left;
        }
        h2 {
          font-size: 24px !important;
          text-align: left;
        }
        h3 {
          font-size: 20px !important;
          text-align: left;
        }
        .es-header-body h1 a,
        .es-content-body h1 a,
        .es-footer-body h1 a {
          font-size: 30px !important;
          text-align: left;
        }
        .es-header-body h2 a,
        .es-content-body h2 a,
        .es-footer-body h2 a {
          font-size: 24px !important;
          text-align: left;
        }
        .es-header-body h3 a,
        .es-content-body h3 a,
        .es-footer-body h3 a {
          font-size: 20px !important;
          text-align: left;
        }
        .es-menu td a {
          font-size: 14px !important;
        }
        .es-header-body p,
        .es-header-body ul li,
        .es-header-body ol li,
        .es-header-body a {
          font-size: 14px !important;
        }
        .es-content-body p,
        .es-content-body ul li,
        .es-content-body ol li,
        .es-content-body a {
          font-size: 14px !important;
        }
        .es-footer-body p,
        .es-footer-body ul li,
        .es-footer-body ol li,
        .es-footer-body a {
          font-size: 14px !important;
        }
        .es-infoblock p,
        .es-infoblock ul li,
        .es-infoblock ol li,
        .es-infoblock a {
          font-size: 12px !important;
        }
        *[class="gmail-fix"] {
          display: none !important;
        }
        .es-m-txt-c,
        .es-m-txt-c h1,
        .es-m-txt-c h2,
        .es-m-txt-c h3 {
          text-align: center !important;
        }
        .es-m-txt-r,
        .es-m-txt-r h1,
        .es-m-txt-r h2,
        .es-m-txt-r h3 {
          text-align: right !important;
        }
        .es-m-txt-l,
        .es-m-txt-l h1,
        .es-m-txt-l h2,
        .es-m-txt-l h3 {
          text-align: left !important;
        }
        .es-m-txt-r img,
        .es-m-txt-c img,
        .es-m-txt-l img {
          display: inline !important;
        }
        .es-button-border {
          display: inline-block !important;
        }
        a.es-button,
        button.es-button {
          font-size: 18px !important;
          display: inline-block !important;
        }
        .es-adaptive table,
        .es-left,
        .es-right {
          width: 100% !important;
        }
        .es-content table,
        .es-header table,
        .es-footer table,
        .es-content,
        .es-footer,
        .es-header {
          width: 100% !important;
          max-width: 600px !important;
        }
        .es-adapt-td {
          display: block !important;
          width: 100% !important;
        }
        .adapt-img {
          width: 100% !important;
          height: auto !important;
        }
        .es-m-p0 {
          padding: 0px !important;
        }
        .es-m-p0r {
          padding-right: 0px !important;
        }
        .es-m-p0l {
          padding-left: 0px !important;
        }
        .es-m-p0t {
          padding-top: 0px !important;
        }
        .es-m-p0b {
          padding-bottom: 0 !important;
        }
        .es-m-p20b {
          padding-bottom: 20px !important;
        }
        .es-mobile-hidden,
        .es-hidden {
          display: none !important;
        }
        tr.es-desk-hidden,
        td.es-desk-hidden,
        table.es-desk-hidden {
          width: auto !important;
          overflow: visible !important;
          float: none !important;
          max-height: inherit !important;
          line-height: inherit !important;
        }
        tr.es-desk-hidden {
          display: table-row !important;
        }
        table.es-desk-hidden {
          display: table !important;
        }
        td.es-desk-menu-hidden {
          display: table-cell !important;
        }
        .es-menu td {
          width: 1% !important;
        }
        table.es-table-not-adapt,
        .esd-block-html table {
          width: auto !important;
        }
        table.es-social {
          display: inline-block !important;
        }
        table.es-social td {
          display: inline-block !important;
        }
        .es-desk-hidden {
          display: table-row !important;
          width: auto !important;
          overflow: visible !important;
          max-height: inherit !important;
        }
      }
      /* END RESPONSIVE STYLES */
    </style>
  </head>
  <body>
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill
            type="tile"
            color="#f6f6f6"
            origin="0.5, 0"
            position="0.5, 0"
          ></v:fill>
        </v:background>
      <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td class="ui-droppable" valign="top">
              <table
                class="esd-header-popover es-header ui-draggable"
                cellspacing="0"
                cellpadding="0"
                align="center"
              >
                <tbody>
                  <tr>
                    <td
                      class="esd-stripe esd-frame esdev-disable-select esd-hover"
                      align="center"
                      esd-handler-name="stripeBlockHandler"
                    >
                      <div class="esd-block-btn">
                        <div class="esd-more">
                          <a><span class="es-icon-dot-3"></span></a>
                        </div>

                        <div class="esd-save" title="Guardar como módulo">
                          <a><span class="es-icon-save"></span></a>
                        </div>

                        <div class="esd-move ui-draggable-handle" title="Mover">
                          <a><span class="es-icon-move"></span></a>
                        </div>
                        <div
                          class="esd-copy ui-draggable-handle"
                          title="Copiar"
                        >
                          <a><span class="es-icon-copy"></span></a>
                        </div>

                        <div class="esd-delete" title="Eliminar">
                          <a><span class="es-icon-delete"></span></a>
                        </div>
                      </div>
                      <div class="esd-add-stripe">
                        <a><span class="es-icon-plus"></span></a>
                        <div class="esd-stripes-popover esd-hidden-right">
                          <div class="esd-popover-content">
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_100"
                            >
                              <div class="col-xs-12">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_50_50"
                            >
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_33_33"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_25_25_25_25"
                            >
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_66"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_66_33"
                            >
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table
                        class="es-header-body"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tbody class="ui-droppable">
                          <tr class="ui-draggable">
                            <td
                              class="esd-structure es-p20 esd-frame esdev-disable-select esd-hover"
                              align="left"
                              bgcolor="#3C4146"
                              style="background-color: #3c4146"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div
                                  class="esd-delete"
                                  title="Eliminar"
                                  disabled="disabled"
                                >
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                cellspacing="0"
                                cellpadding="0"
                                width="100%"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      width="560"
                                      align="left"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-text esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  font-size: 25px;
                                                  color: #ffffff;
                                                "
                                              >
                                                <strong
                                                  >MUNICIPALIDAD DISTRITAL DE
                                                  PICHARI</strong
                                                >
                                              </p>
                                            </td>
                                          </tr>
                                          <tr class="ui-draggable">
                                            <td
                                              align="left"
                                              class="esd-block-text esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  color: #ffffff;
                                                  font-size: 12px;
                                                  text-align: center;
                                                "
                                              >
                                                CORREO ELECTRONICO DE
                                                NOTIFICACIONES
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="es-content ui-draggable"
                cellspacing="0"
                cellpadding="0"
                align="center"
              >
                <tbody>
                  <tr>
                    <td
                      class="esd-stripe esd-frame esdev-disable-select esd-hover"
                      align="center"
                      esd-handler-name="stripeBlockHandler"
                    >
                      <div class="esd-block-btn">
                        <div class="esd-more">
                          <a><span class="es-icon-dot-3"></span></a>
                        </div>

                        <div class="esd-save" title="Guardar como módulo">
                          <a><span class="es-icon-save"></span></a>
                        </div>

                        <div class="esd-move ui-draggable-handle" title="Mover">
                          <a><span class="es-icon-move"></span></a>
                        </div>
                        <div
                          class="esd-copy ui-draggable-handle"
                          title="Copiar"
                        >
                          <a><span class="es-icon-copy"></span></a>
                        </div>

                        <div class="esd-delete" title="Eliminar">
                          <a><span class="es-icon-delete"></span></a>
                        </div>
                      </div>
                      <div class="esd-add-stripe">
                        <a><span class="es-icon-plus"></span></a>
                        <div class="esd-stripes-popover esd-hidden-right">
                          <div class="esd-popover-content">
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_100"
                            >
                              <div class="col-xs-12">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_50_50"
                            >
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_33_33"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_25_25_25_25"
                            >
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_66"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_66_33"
                            >
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table
                        class="es-content-body"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tbody class="ui-droppable">
                          <tr class="ui-draggable">
                            <td
                              class="es-p20t es-p20r es-p20l esd-structure esd-frame esdev-disable-select esd-hover"
                              align="left"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div
                                  class="esd-delete"
                                  title="Eliminar"
                                  disabled="disabled"
                                >
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      width="560"
                                      valign="top"
                                      align="center"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              align="left"
                                              class="esd-block-text esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  font-size: 34px;
                                                  text-align: center;
                                                "
                                              >
                                                <strong
                                                  >Mesa de partes
                                                  virtual</strong
                                                >
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="es-footer ui-draggable"
                cellspacing="0"
                cellpadding="0"
                align="center"
              >
                <tbody>
                  <tr>
                    <td
                      class="esd-stripe esd-frame esdev-disable-select"
                      align="center"
                      esd-handler-name="stripeBlockHandler"
                    >
                      <div class="esd-block-btn">
                        <div class="esd-more">
                          <a><span class="es-icon-dot-3"></span></a>
                        </div>

                        <div class="esd-save" title="Guardar como módulo">
                          <a><span class="es-icon-save"></span></a>
                        </div>

                        <div class="esd-move ui-draggable-handle" title="Mover">
                          <a><span class="es-icon-move"></span></a>
                        </div>
                        <div
                          class="esd-copy ui-draggable-handle"
                          title="Copiar"
                        >
                          <a><span class="es-icon-copy"></span></a>
                        </div>

                        <div class="esd-delete" title="Eliminar">
                          <a><span class="es-icon-delete"></span></a>
                        </div>
                      </div>
                      <div class="esd-add-stripe">
                        <a><span class="es-icon-plus"></span></a>
                        <div class="esd-stripes-popover esd-hidden-right">
                          <div class="esd-popover-content">
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_100"
                            >
                              <div class="col-xs-12">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_50_50"
                            >
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_33_33"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_25_25_25_25"
                            >
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_66"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_66_33"
                            >
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table
                        class="es-footer-body"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tbody class="ui-droppable">
                          <tr class="ui-draggable">
                            <td
                              class="esd-structure es-p20t es-p20r es-p20l esd-frame esdev-disable-select esd-hover"
                              align="left"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div class="esd-delete" title="Eliminar">
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      width="560"
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      align="center"
                                      valign="top"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-image esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              style="font-size: 0px"
                                              esd-handler-name="imgBlockHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <a target="_blank"
                                                ><img
                                                  class="adapt-img"
                                                  src="cid:logo_merchant"
                                                  alt="Logo merchant"
                                                  style="display: block"
                                                  width="115"
                                              /></a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr class="ui-draggable">
                            <td
                              class="esd-structure es-p20t es-p20r es-p20l esd-frame esdev-disable-select esd-hover"
                              align="left"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div class="esd-delete" title="Eliminar">
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      width="560"
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      align="center"
                                      valign="top"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-text es-p15b esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  font-size: 20px;
                                                  color: #3c4146;
                                                "
                                              >
                                                Hola, ${citizen_full_name}
                                              </p>
                                            </td>
                                          </tr>
                                          <tr class="ui-draggable">
                                            <td
                                              class="esd-block-text es-p20b esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  font-size: 18px;
                                                  color: #3c4146;
                                                  line-height: 150%;
                                                  text-align: justify;
                                                "
                                              >
                                                ¡Agradecemos tu interacción con
                                                nuestro sistema! El número de
                                                trámite asignado a tu solicitud
                                                es un identificador único que te
                                                permitirá dar seguimiento al
                                                progreso de tu trámite. Te
                                                recomendamos que conserves este
                                                número para futuras consultas o
                                                actualizaciones sobre tu
                                                solicitud.<br />Si tienes alguna
                                                pregunta o necesitas más
                                                información, no dudes en
                                                comunicarte con nosotros a
                                                través de los canales de
                                                contacto proporcionados. Estamos
                                                aquí para brindarte la mejor
                                                asistencia posible.
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr class="ui-draggable">
                            <td
                              class="esd-structure es-p20t es-p40r es-p40l esd-frame esdev-disable-select esd-hover"
                              align="left"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div class="esd-delete" title="Eliminar">
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      width="520"
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      align="center"
                                      valign="top"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-text es-p15t es-p15b es-p40r es-p40l esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              bgcolor="#00A638"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  font-size: 28px;
                                                  color: #ffffff;
                                                "
                                              >
                                                <strong
                                                  >${procedure_number}</strong
                                                >
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr class="ui-draggable">
                            <td
                              class="esd-structure es-p30b esd-frame esdev-disable-select esd-hover"
                              align="left"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div class="esd-delete" title="Eliminar">
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      width="600"
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      align="center"
                                      valign="top"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-text es-p5t esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  color: #3c4146;
                                                  font-size: 18px;
                                                "
                                              >
                                                Fecha y hora de registro:
                                                ${created_at_format}
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr class="ui-draggable">
                                    <td
                                      class="es-m-p0r esd-container-frame es-m-p20b esd-frame esd-hover esdev-disable-select"
                                      esd-dynamic-block="{&amp;quot;link&amp;quot;:{&amp;quot;blockMapping&amp;quot;:[{&amp;quot;selector&amp;quot;:&amp;quot;a&amp;quot;,&amp;quot;attribute&amp;quot;:&amp;quot;href&amp;quot;}]},&amp;quot;variables&amp;quot;:[{&amp;quot;variable&amp;quot;:&amp;quot;p_name&amp;quot;,&amp;quot;name&amp;quot;:&amp;quot;Name&amp;quot;,&amp;quot;blockMapping&amp;quot;:[{&amp;quot;selector&amp;quot;:&amp;quot;.esd-block-text .product-name&amp;quot;},{&amp;quot;selector&amp;quot;:&amp;quot;.esd-block-image a img&amp;quot;,&amp;quot;attribute&amp;quot;:&amp;quot;title&amp;quot;},{&amp;quot;selector&amp;quot;:&amp;quot;.esd-block-image a img&amp;quot;,&amp;quot;attribute&amp;quot;:&amp;quot;alt&amp;quot;}],&amp;quot;externalMapping&amp;quot;:{&amp;quot;pageSelector&amp;quot;:{&amp;quot;selector&amp;quot;:&amp;quot;&amp;quot;},&amp;quot;modifier&amp;quot;:{&amp;quot;regexs&amp;quot;:[]}},{&amp;quot;variable&amp;quot;:&amp;quot;p_price&amp;quot;,&amp;quot;name&amp;quot;:&amp;quot;Price&amp;quot;,&amp;quot;blockMapping&amp;quot;:[{&amp;quot;selector&amp;quot;:&amp;quot;.esd-block-text .price&amp;quot;}],&amp;quot;externalMapping&amp;quot;:{&amp;quot;pageSelector&amp;quot;:{&amp;quot;selector&amp;quot;:&amp;quot;&amp;quot;},&amp;quot;modifier&amp;quot;:{&amp;quot;regexs&amp;quot;:[]}},{&amp;quot;variable&amp;quot;:&amp;quot;p_image&amp;quot;,&amp;quot;name&amp;quot;:&amp;quot;Image&amp;quot;,&amp;quot;blockMapping&amp;quot;:[{&amp;quot;selector&amp;quot;:&amp;quot;.esd-block-image img&amp;quot;,&amp;quot;attribute&amp;quot;:&amp;quot;src&amp;quot;}],&amp;quot;externalMapping&amp;quot;:{&amp;quot;pageSelector&amp;quot;:{&amp;quot;selector&amp;quot;:&amp;quot;&amp;quot;},&amp;quot;modifier&amp;quot;:{&amp;quot;regexs&amp;quot;:[]}}]}"
                                      width="600"
                                      align="center"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              class="esd-block-button esd-frame esd-hover esdev-disable-select esd-draggable esd-block es-p20t"
                                              align="center"
                                              esd-handler-name="btnBlockHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <span
                                                class="es-button-border"
                                                style="
                                                  border-radius: 5px;
                                                  border-width: 0px;
                                                  border-color: rgb(
                                                    44,
                                                    181,
                                                    67
                                                  );
                                                  background: rgb(238, 42, 47);
                                                "
                                                ><a
                                                  href="${link}"
                                                  class="es-button es-button-1717367029864"
                                                  target="_blank"
                                                  style="
                                                    background: rgb(
                                                      238,
                                                      42,
                                                      47
                                                    );
                                                    border-radius: 5px;
                                                    padding: 15px 55px;
                                                    font-weight: bold;
                                                    mso-border-alt: 10px solid
                                                      rgb(238, 42, 47);
                                                  "
                                                  >Consultar</a
                                                ></span
                                              ><esd-config-block
                                                value='{"configClass":"es-button-1717367029864","rule":"[data-ogsb] .es-button.es-button-1717367029864","properties":{"padding":"15px 55px !important"}'
                                                name="btnIndentSettingsControl"
                                                style="display: none"
                                              ></esd-config-block>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr class="ui-draggable">
                            <td
                              class="esd-structure es-p20r es-p20l esd-frame esdev-disable-select esd-hover"
                              align="left"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div class="esd-delete" title="Eliminar">
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      width="560"
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      align="center"
                                      valign="top"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              class="esd-block-text es-p30b esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  text-align: justify;
                                                  color: #3c4146;
                                                  font-size: 18px;
                                                "
                                              >
                                                Una vez más, agradecemos tu
                                                confianza en nuestros servicios
                                                y esperamos poder cumplir con
                                                tus expectativas. ¡Que tengas un
                                                excelente día!
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="es-header esd-footer-popover ui-draggable"
                cellspacing="0"
                cellpadding="0"
                align="center"
              >
                <tbody>
                  <tr>
                    <td
                      class="esd-stripe esd-frame esdev-disable-select esd-hover"
                      align="center"
                      esd-handler-name="stripeBlockHandler"
                    >
                      <div class="esd-block-btn">
                        <div class="esd-more">
                          <a><span class="es-icon-dot-3"></span></a>
                        </div>

                        <div class="esd-save" title="Guardar como módulo">
                          <a><span class="es-icon-save"></span></a>
                        </div>

                        <div class="esd-move ui-draggable-handle" title="Mover">
                          <a><span class="es-icon-move"></span></a>
                        </div>
                        <div
                          class="esd-copy ui-draggable-handle"
                          title="Copiar"
                        >
                          <a><span class="es-icon-copy"></span></a>
                        </div>

                        <div class="esd-delete" title="Eliminar">
                          <a><span class="es-icon-delete"></span></a>
                        </div>
                      </div>
                      <div class="esd-add-stripe">
                        <a><span class="es-icon-plus"></span></a>
                        <div class="esd-stripes-popover esd-hidden-right">
                          <div class="esd-popover-content">
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_100"
                            >
                              <div class="col-xs-12">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_50_50"
                            >
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-6">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_33_33"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_25_25_25_25"
                            >
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-3">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_33_66"
                            >
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                            <div
                              class="esd-stripe-preview"
                              esd-element-name="structureType_66_33"
                            >
                              <div class="col-xs-8">
                                <a class="esd-structure-preview"></a>
                              </div>
                              <div class="col-xs-4">
                                <a class="esd-structure-preview"></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <table
                        class="es-header-body"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                      >
                        <tbody class="ui-droppable">
                          <tr class="ui-draggable">
                            <td
                              class="esd-structure es-p20 esd-frame esdev-disable-select esd-hover"
                              align="left"
                              bgcolor="#3C4146"
                              style="background-color: #3c4146"
                              esd-handler-name="structureBlockHandler"
                            >
                              <div class="esd-block-btn">
                                <div class="esd-more">
                                  <a><span class="es-icon-dot-3"></span></a>
                                </div>

                                <div
                                  class="esd-save"
                                  title="Guardar como módulo"
                                >
                                  <a><span class="es-icon-save"></span></a>
                                </div>

                                <div
                                  class="esd-move ui-draggable-handle"
                                  title="Mover"
                                >
                                  <a><span class="es-icon-move"></span></a>
                                </div>
                                <div
                                  class="esd-copy ui-draggable-handle"
                                  title="Copiar"
                                >
                                  <a><span class="es-icon-copy"></span></a>
                                </div>

                                <div
                                  class="esd-delete"
                                  title="Eliminar"
                                  disabled="disabled"
                                >
                                  <a><span class="es-icon-delete"></span></a>
                                </div>
                              </div>
                              <table
                                cellspacing="0"
                                cellpadding="0"
                                width="100%"
                              >
                                <tbody class="ui-droppable">
                                  <tr class="ui-draggable">
                                    <td
                                      class="esd-container-frame esd-frame esd-hover esdev-disable-select"
                                      width="560"
                                      align="left"
                                      esd-handler-name="containerHandler"
                                    >
                                      <div class="esd-block-btn">
                                        <div class="esd-more">
                                          <a
                                            ><span class="es-icon-dot-3"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-save"
                                          title="Guardar como módulo"
                                        >
                                          <a
                                            ><span class="es-icon-save"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-move ui-draggable-handle"
                                          title="Mover"
                                        >
                                          <a
                                            ><span class="es-icon-move"></span
                                          ></a>
                                        </div>
                                        <div
                                          class="esd-copy ui-draggable-handle"
                                          title="Copiar"
                                        >
                                          <a
                                            ><span class="es-icon-copy"></span
                                          ></a>
                                        </div>

                                        <div
                                          class="esd-delete"
                                          title="Eliminar"
                                        >
                                          <a
                                            ><span class="es-icon-delete"></span
                                          ></a>
                                        </div>
                                      </div>
                                      <table
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                      >
                                        <tbody class="ui-droppable">
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-text esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  font-size: 25px;
                                                  color: #ffffff;
                                                "
                                              >
                                                <strong></strong
                                                ><strong
                                                  ><span style="font-size: 16px"
                                                    >¿NECESITAS AYUDA?</span
                                                  ><span
                                                    style="font-size: 16px"
                                                  ></span></strong
                                                ><strong></strong>
                                              </p>
                                            </td>
                                          </tr>
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-text esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  color: #ffffff;
                                                  font-size: 12px;
                                                "
                                              >
                                                Ingresa aquí para poder guiarte
                                                como hacer uso del sistema
                                              </p>
                                            </td>
                                          </tr>
                                          <tr class="ui-draggable">
                                            <td
                                              align="center"
                                              class="esd-block-text esd-frame esd-hover esdev-disable-select esd-draggable esd-block"
                                              esd-handler-name="textElementHandler"
                                            >
                                              <div
                                                class="esd-block-btn esd-no-block-library"
                                              >
                                                <div class="esd-more">
                                                  <a
                                                    ><span
                                                      class="es-icon-dot-3"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-move ui-draggable-handle"
                                                  title="Mover"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-move"
                                                    ></span
                                                  ></a>
                                                </div>
                                                <div
                                                  class="esd-copy ui-draggable-handle"
                                                  title="Copiar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-copy"
                                                    ></span
                                                  ></a>
                                                </div>

                                                <div
                                                  class="esd-delete"
                                                  title="Eliminar"
                                                >
                                                  <a
                                                    ><span
                                                      class="es-icon-delete"
                                                    ></span
                                                  ></a>
                                                </div>
                                              </div>
                                              <p
                                                style="
                                                  color: #ffffff;
                                                  font-size: 12px;
                                                "
                                              >
                                                sgd.munipichari.gob.pe/ayuda
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>

`;
