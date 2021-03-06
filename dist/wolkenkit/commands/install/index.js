'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var docker = require('../../../docker'),
    errors = require('../../../errors'),
    noop = require('../../../noop'),
    runtimes = require('../../runtimes'),
    shared = require('../shared');

var install =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(options) {
    var progress,
        directory,
        env,
        version,
        configuration,
        images,
        installationStatus,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            progress = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : noop;

            if (options) {
              _context2.next = 3;
              break;
            }

            throw new Error('Options are missing.');

          case 3:
            if (options.directory) {
              _context2.next = 5;
              break;
            }

            throw new Error('Directory is missing.');

          case 5:
            if (options.env) {
              _context2.next = 7;
              break;
            }

            throw new Error('Environment is missing.');

          case 7:
            if (options.version) {
              _context2.next = 9;
              break;
            }

            throw new Error('Version is missing.');

          case 9:
            directory = options.directory, env = options.env, version = options.version;
            _context2.next = 12;
            return shared.getConfiguration({
              env: env,
              directory: directory,
              isPackageJsonRequired: false
            }, progress);

          case 12:
            configuration = _context2.sent;
            _context2.next = 15;
            return shared.checkDocker({
              configuration: configuration,
              env: env
            }, progress);

          case 15:
            _context2.prev = 15;
            _context2.next = 18;
            return runtimes.getImages({
              forVersion: version
            });

          case 18:
            images = _context2.sent;
            _context2.next = 30;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](15);
            _context2.t1 = _context2.t0.code;
            _context2.next = _context2.t1 === 'EVERSIONNOTFOUND' ? 26 : 28;
            break;

          case 26:
            progress({
              message: 'Version does not exist.',
              type: 'info'
            });
            return _context2.abrupt("break", 29);

          case 28:
            progress({
              message: _context2.t0.message,
              type: 'info'
            });

          case 29:
            throw _context2.t0;

          case 30:
            _context2.next = 32;
            return runtimes.getInstallationStatus({
              configuration: configuration,
              env: env,
              forVersion: version
            });

          case 32:
            installationStatus = _context2.sent;

            if (!(installationStatus === 'installed')) {
              _context2.next = 36;
              break;
            }

            progress({
              message: "wolkenkit ".concat(version, " is already installed."),
              type: 'info'
            });
            throw new errors.RuntimeAlreadyInstalled();

          case 36:
            _context2.next = 38;
            return Promise.all(images.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(image) {
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        progress({
                          message: "Pulling ".concat(image.name, ":").concat(image.version, "...")
                        });
                        _context.prev = 1;
                        _context.next = 4;
                        return docker.pullImage({
                          configuration: configuration,
                          env: env,
                          name: image.name,
                          version: image.version
                        });

                      case 4:
                        _context.next = 10;
                        break;

                      case 6:
                        _context.prev = 6;
                        _context.t0 = _context["catch"](1);
                        progress({
                          message: "Failed to pull ".concat(image.name, ":").concat(image.version, "."),
                          type: 'info'
                        });
                        throw _context.t0;

                      case 10:
                        progress({
                          message: "Pulled ".concat(image.name, ":").concat(image.version, "."),
                          type: 'info'
                        });

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[1, 6]]);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[15, 21]]);
  }));

  return function install(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = install;