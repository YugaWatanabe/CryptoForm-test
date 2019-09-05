"use strct";

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;

const ipcMain = electron.ipcMain;

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;

let loginCallback;
let subWindow;

// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on("ready", () => {
  //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  mainWindow = new BrowserWindow({ width: 1280, height: 720, useContentSize: true });
  //使用するhtmlファイルを指定する
  mainWindow.loadFile("index.html");

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

});

app.on("login", (event, webContents, request, authInfo, callback) => {
  event.preventDefault();
  subWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true
  });
  subWindow.loadFile("auth.html");
  loginCallback = callback;
});

ipcMain.on("authorization", (event, arg) => {
  console.log(arg);
  subWindow.close();
  loginCallback(arg.username, arg.password);
});
