"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountDeletionMail = exports.agronomForgotPasswordMail = exports.adminForgotPasswordMail = exports.clientForgotPasswordMail = exports.farmerActivationMail = exports.clientActivationMail = void 0;
function clientActivationMail(name, link) {
    return `
  <html>
    <head>
      <title>Activate Account - Ortani</title>
    </head>
    <body style="margin: 0; padding: 0; box-sizing: border-box">
      <table align="center" cellpadding="0" cellspacing="0" width="95%">
        <tr>
          <td align="center">
            <img
              src=""
              style="
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 20px;
                width: 120px;
                height: 120px;
              " />
            <h1 style="font-family: Bahnschrift">Ortani<span>.</span>id</h1>
            <table
              align="center"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-spacing: 2px 5px"
              bgcolor="#fff">
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 10px 0 10px 0;
                          font-family: poppins, sans-serif;
                          font-size: 20px;
                          font-weight: 900;
                        ">
                        Aktivasi Akun Anda di Ortani.id
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 20px 0 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Hi, <span id="name">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Untuk dapat mengakses seluruh fitur di aplikasi kami, Anda
                        perlu mengaktifkan akun Anda dengan mengklik tombol di
                        bawah ini:
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 40px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                          text-align: center;
                        ">
                        <a
                          href="${link}"
                          style="
                            background-color: #f49f12;
                            color: white;
                            padding: 15px 80px;
                            text-decoration: none;
                          "
                          >Activate Account</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Segera setelah Anda mengaktifkan akun Anda, Anda dapat
                        masuk ke aplikasi dan mulai menikmati layanan kami.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 50px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Regards, <br /><br />
                        <br />
                        <p>Ortani.id</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
exports.clientActivationMail = clientActivationMail;
function farmerActivationMail(name, link) {
    return `
  <html>
    <head>
      <title>Activate Account - Ortani Affiliate</title>
    </head>
    <body style="margin: 0; padding: 0; box-sizing: border-box">
      <table align="center" cellpadding="0" cellspacing="0" width="95%">
        <tr>
          <td align="center">
            <img
              src=""
              style="
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 20px;
                width: 120px;
                height: 120px;
              " />
            <h1 style="font-family: Bahnschrift">Ortani<span>.</span>id</h1>
            <table
              align="center"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-spacing: 2px 5px"
              bgcolor="#fff">
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 10px 0 10px 0;
                          font-family: poppins, sans-serif;
                          font-size: 20px;
                          font-weight: 900;
                        ">
                        Aktivasi Akun Anda di Ortani.id
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 20px 0 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Hi, <span id="name">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Untuk dapat mengakses seluruh fitur di aplikasi kami, Anda
                        perlu mengaktifkan akun Anda dengan mengklik tombol di
                        bawah ini:
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 40px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                          text-align: center;
                        ">
                        <a
                          href="${link}"
                          style="
                            background-color: #f49f12;
                            color: white;
                            padding: 15px 80px;
                            text-decoration: none;
                          "
                          >Activate Account</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Segera setelah Anda mengaktifkan akun Anda, Anda dapat
                        masuk ke aplikasi dan mulai menikmati layanan kami.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 50px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Regards, <br /><br />
                        <br />
                        <p>Ortani.id</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
exports.farmerActivationMail = farmerActivationMail;
function clientForgotPasswordMail(name, link) {
    return `
  <html>
    <head>
      <title>Konfirmasi Pengaturan Ulang Kata Sandi</title>
    </head>
    <body style="margin: 0; padding: 0; box-sizing: border-box">
      <table align="center" cellpadding="0" cellspacing="0" width="95%">
        <tr>
          <td align="center">
            <table
              align="center"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-spacing: 2px 5px"
              bgcolor="#fff">
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 10px 0 10px 0;
                          font-family: poppins, sans-serif;
                          font-size: 20px;
                          font-weight: 900;
                        ">
                        Konfirmasi Pengaturan Ulang Kata Sandi
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 20px 0 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Hi, <span id="name">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Kami telah menerima permintaan untuk mereset kata sandi
                        akun Ortani.id Anda. Untuk melanjutkan proses reset kata
                        sandi, silakan klik tombol di bawah ini:
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 40px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                          text-align: center;
                        ">
                        <a
                          href="${link}"
                          style="
                            background-color: #ff5c00;
                            color: white;
                            padding: 15px 80px;
                            text-decoration: none;
                          "
                          >Reset Password</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Harap diperhatikan bahwa tautan reset kata sandi ini akan
                        kedaluwarsa dalam waktu 5 menit untuk alasan keamanan.
                        Jika Anda tidak menyelesaikan proses reset kata sandi
                        dalam waktu yang ditentukan, Anda perlu mengajukan
                        permintaan baru.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Jika Anda tidak melakukan permintaan reset kata sandi ini,
                        silakan abaikan email ini. Mohon pastikan bahwa akun Anda
                        aman dan tidak ada perubahan yang dilakukan.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Untuk bantuan lebih lanjut atau jika Anda memiliki
                        pertanyaan, jangan ragu untuk menghubungi tim dukungan
                        kami di [Email Dukungan/Nomor Telepon Dukungan].
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 50px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Regards, <br /><br />
                        <br />
                        <p>Ortani.id</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
exports.clientForgotPasswordMail = clientForgotPasswordMail;
function adminForgotPasswordMail(name, link) {
    return `
  <html>
    <head>
      <title>Konfirmasi Pengaturan Ulang Kata Sandi</title>
    </head>
    <body style="margin: 0; padding: 0; box-sizing: border-box">
      <table align="center" cellpadding="0" cellspacing="0" width="95%">
        <tr>
          <td align="center">
            <table
              align="center"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-spacing: 2px 5px"
              bgcolor="#fff">
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 10px 0 10px 0;
                          font-family: poppins, sans-serif;
                          font-size: 20px;
                          font-weight: 900;
                        ">
                        Konfirmasi Pengaturan Ulang Kata Sandi
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 20px 0 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Hi, <span id="name">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Kami telah menerima permintaan untuk mereset kata sandi
                        akun admin Ortani.id Anda. Untuk melanjutkan proses reset kata
                        sandi, silakan klik tombol di bawah ini:
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 40px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                          text-align: center;
                        ">
                        <a
                          href="${link}"
                          style="
                            background-color: #ff5c00;
                            color: white;
                            padding: 15px 80px;
                            text-decoration: none;
                          "
                          >Reset Password</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Harap diperhatikan bahwa tautan reset kata sandi ini akan
                        kedaluwarsa dalam waktu 5 menit untuk alasan keamanan.
                        Jika Anda tidak menyelesaikan proses reset kata sandi
                        dalam waktu yang ditentukan, Anda perlu mengajukan
                        permintaan baru.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Jika Anda tidak melakukan permintaan reset kata sandi ini,
                        silakan abaikan email ini. Mohon pastikan bahwa akun Anda
                        aman dan tidak ada perubahan yang dilakukan.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Untuk bantuan lebih lanjut atau jika Anda memiliki
                        pertanyaan, jangan ragu untuk menghubungi tim dukungan
                        kami di [Email Dukungan/Nomor Telepon Dukungan].
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 50px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Regards, <br /><br />
                        <br />
                        <p>Ortani.id</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
exports.adminForgotPasswordMail = adminForgotPasswordMail;
function agronomForgotPasswordMail(name, link) {
    return `
  <html>
    <head>
      <title>Konfirmasi Pengaturan Ulang Kata Sandi</title>
    </head>
    <body style="margin: 0; padding: 0; box-sizing: border-box">
      <table align="center" cellpadding="0" cellspacing="0" width="95%">
        <tr>
          <td align="center">
            <table
              align="center"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-spacing: 2px 5px"
              bgcolor="#fff">
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 10px 0 10px 0;
                          font-family: poppins, sans-serif;
                          font-size: 20px;
                          font-weight: 900;
                        ">
                        Konfirmasi Pengaturan Ulang Kata Sandi
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td bgcolor="#fff">
                  <table cellpadding="0" cellspacing="0" width="100%%">
                    <tr>
                      <td
                        style="
                          padding: 20px 0 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Hi, <span id="name">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Kami telah menerima permintaan untuk mereset kata sandi
                        akun agr
                        onom Ortani.id Anda. Untuk melanjutkan proses reset kata
                        sandi, silakan klik tombol di bawah ini:
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 40px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                          text-align: center;
                        ">
                        <a
                          href="${link}"
                          style="
                            background-color: #ff5c00;
                            color: white;
                            padding: 15px 80px;
                            text-decoration: none;
                          "
                          >Reset Password</a
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Harap diperhatikan bahwa tautan reset kata sandi ini akan
                        kedaluwarsa dalam waktu 5 menit untuk alasan keamanan.
                        Jika Anda tidak menyelesaikan proses reset kata sandi
                        dalam waktu yang ditentukan, Anda perlu mengajukan
                        permintaan baru.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 20px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Jika Anda tidak melakukan permintaan reset kata sandi ini,
                        silakan abaikan email ini. Mohon pastikan bahwa akun Anda
                        aman dan tidak ada perubahan yang dilakukan.
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Untuk bantuan lebih lanjut atau jika Anda memiliki
                        pertanyaan, jangan ragu untuk menghubungi tim dukungan
                        kami di [Email Dukungan/Nomor Telepon Dukungan].
                      </td>
                    </tr>
                    <tr>
                      <td
                        style="
                          padding: 50px 0;
                          font-family: poppins, sans-serif;
                          font-size: 16px;
                        ">
                        Regards, <br /><br />
                        <br />
                        <p>Ortani.id</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
exports.agronomForgotPasswordMail = agronomForgotPasswordMail;
function accountDeletionMail(name, link) {
    return `
    <html>
      <head>
        <title>Konfirmasi Penghapusan Akun</title>
      </head>
      <body style="margin: 0; padding: 0; box-sizing: border-box">
        <table align="center" cellpadding="0" cellspacing="0" width="95%">
          <tr>
            <td align="center">
              <table
                align="center"
                cellpadding="0"
                cellspacing="0"
                width="600"
                style="border-spacing: 2px 5px"
                bgcolor="#fff">
                <tr>
                  <td bgcolor="#fff">
                    <table cellpadding="0" cellspacing="0" width="100%%">
                      <tr>
                        <td
                          style="
                            padding: 10px 0 10px 0;
                            font-family: poppins, sans-serif;
                            font-size: 20px;
                            font-weight: 900;
                          ">
                          Konfirmasi Penghapusan Akun
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#fff">
                    <table cellpadding="0" cellspacing="0" width="100%%">
                      <tr>
                        <td
                          style="
                            padding: 20px 0 20px 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Hi, <span id="name">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 20px 0 20px 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Kami telah menerima permintaan untuk menghapus akun
                          Ortani.id Anda. Kami ingin memastikan bahwa Anda benar-benar
                          ingin melanjutkan proses ini sebelum kami
                          menghapus akun Anda secara permanen.
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Silakan klik tautan di bawah ini untuk mengonfirmasi penghapusan akun Anda:
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 40px 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                            text-align: center;
                          ">
                          <a
                            href="${link}"
                            style="
                              background-color: #ff5c00;
                              color: white;
                              padding: 15px 80px;
                              text-decoration: none;
                            "
                            >Delete Account</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Setelah Anda mengklik tautan tersebut,
                          akun Anda akan dijadwalkan untuk dihapus
                          dalam waktu 7 hari. Selama periode ini,
                          Anda masih memiliki kesempatan untuk membatalkan
                          penghapusan dan mengakses akun Anda seperti biasa.
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 20px 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Namun, jika Anda tidak melakukan konfirmasi
                          dalam waktu 7 hari, akun Anda akan dihapus
                          secara permanen dan semua data terkait akan hilang.
                          Jika Anda memiliki data penting yang ingin Anda
                          simpan, pastikan untuk mencadangkannya
                          sebelum batas waktu yang ditentukan.
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 20px 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Harap diperhatikan bahwa setelah penghapusan dilakukan,
                          Anda tidak akan dapat lagi mengakses akun atau
                          informasi yang terkait dengannya, dan semua
                          data pribadi yang kami miliki tentang Anda akan dihapus
                          sesuai dengan kebijakan privasi kami.
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 20px 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Jika Anda tidak mengajukan permintaan ini atau jika
                          Anda menganggap email ini sebagai kesalahan,
                          harap segera hubungi kami melalui alamat email
                          kami yang tercantum di bawah ini. Kami akan dengan
                          senang hati membantu Anda dalam proses ini.
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Terima kasih atas penggunaan layanan kami. Kami berharap
                          Anda puas dengan pengalaman yang Anda miliki, dan kami
                          akan menyambut Anda kembali di masa depan jika Anda
                          memutuskan untuk bergabung lagi.
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            padding: 50px 0;
                            font-family: poppins, sans-serif;
                            font-size: 16px;
                          ">
                          Regards, <br /><br />
                          <br />
                          <p>Ortani.id</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
exports.accountDeletionMail = accountDeletionMail;
