"use strict";

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _promises = _interopRequireDefault(require("fs/promises"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Product = /*#__PURE__*/function () {
  function Product() {
    _classCallCheck(this, Product);

    this.content = [];
  }

  _createClass(Product, [{
    key: "newProduct",
    value: function () {
      var _newProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title, price, thumbnail) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.content.push({
                  title: title,
                  price: price,
                  thumbnail: thumbnail,
                  id: this.content.length + 1
                });
                _context.next = 4;
                return _promises["default"].writeFile(this.filename, JSON.stringify(this.content, null, 2));

              case 4:
                console.log("Producto ".concat(title, " agregado a ").concat(this.filename));
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log('No se pudo agregar un producto');

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function newProduct(_x, _x2, _x3) {
        return _newProduct.apply(this, arguments);
      }

      return newProduct;
    }()
  }, {
    key: "readFile",
    value: function () {
      var _readFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var readedFile;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _promises["default"].readFile(this.filename, 'utf-8');

              case 3:
                readedFile = _context2.sent;
                return _context2.abrupt("return", readedFile);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", this.content);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function readFile() {
        return _readFile.apply(this, arguments);
      }

      return readFile;
    }()
  }, {
    key: "addProduct",
    value: function addProduct(title, price, thumbnail) {
      var newProduct = {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: this.content.length + 1
      };
      this.content.push(newProduct);
      return newProduct;
    }
  }, {
    key: "getProduct",
    value: function getProduct() {
      return this.content;
    }
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _promises["default"].unlink(this.filename);

              case 3:
                console.log("Archivo ".concat(this.filename, " borrado"));
                _context3.next = 9;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                console.log('No se pudo borrar archivo');

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 6]]);
      }));

      function deleteFile() {
        return _deleteFile.apply(this, arguments);
      }

      return deleteFile;
    }()
  }]);

  return Product;
}();

var productos = new Product();
var port = 8080;
var app = (0, _express["default"])(); // Indica que el servidor esta levantado y corriendo en puerto especificado

var server = app.listen(port, function () {
  console.log("Server running in port:  ".concat(port));
}); // Indicar un error que de el servidor.

server.on('error', function (err) {
  console.error("There was an error: ".concat(err));
}); // Endpoint GET para listar todos los productos

app.get('/api/productos/listar', function (req, res) {
  var products = productos.getProduct();

  if (products.length !== 0) {
    res.json({
      products: products
    });
  } else {
    res.json({
      error: 'There are no products'
    });
  }
}); // Endpoint GET para pedir un producto especifico por ID

app.get('/api/productos/listar/:id', function (req, res) {});
app.use(_express["default"].json()); // Indica que el body viene como JSON

app.use(_express["default"].urlencoded({
  extended: true
})); // Indica que el body puede tener un informacion como no string
// Endpoint POST para agregar un producto

app.post('/api/productos/guardar', function (req, res) {
  var body = req.body;
  var newProducts = productos.addProduct(body.title, body.price, body.thumbnail);
  res.json({
    data: newProducts
  });
});