import test from "ava";
import axios from "axios";
import sinon from "sinon";
import MockAdapter from "axios-mock-adapter";
import manageToken from "../src/networking.js";

let exitStub = sinon.stub(process, "exit");
const mock = new MockAdapter(axios);

test.beforeEach(() => {
  exitStub.restore();
  mock.reset();
});

test.serial("manageToken - Success API", async (t) => {
  const reg = "https://google.com";
  const un = "sampleName";
  const pat = "sampleToken";
  const npmToken = "NPMToken";
  exitStub = sinon.stub(process, "exit");
  mock.onPut(`${reg}/-/user/org.couchdb.user:${un}`).reply(200, {
    ok: "success",
    token: npmToken,
  });
  const resp = await manageToken(un, pat, reg);
  t.is(resp.token, npmToken);
});

test.serial("manageToken - Error API", async (t) => {
  const reg = "https://google.com";
  const un = "sampleName";
  const pat = "sampleToken";
  exitStub = sinon.stub(process, "exit");
  mock.onPut(`${reg}/-/user/org.couchdb.user:${un}`).reply(200, {
    failed: true,
  });
  await manageToken(un, pat, reg);
  t.pass(exitStub.calledOnceWith(1));
});

test.serial("manageToken - Server down", async (t) => {
  const reg = "https://google.com";
  const un = "sampleName";
  const pat = "sampleToken";
  exitStub = sinon.stub(process, "exit");
  mock.onPut(`${reg}/-/user/org.couchdb.user:${un}`).reply(500);
  await manageToken(un, pat, reg);
  t.pass(exitStub.calledOnceWith(1));
});
