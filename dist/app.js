"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_config_1 = __importDefault(require("./config/database.config"));
const cors_1 = __importDefault(require("cors"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const todos_1 = __importDefault(require("./routes/todos"));
const viewsRoute_1 = __importDefault(require("./routes/viewsRoute"));
const listingRoute_1 = __importDefault(require("./routes/listingRoute"));
database_config_1.default.sync({ force: true }).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
});
const app = (0, express_1.default)();
// view engine setup
app.set('views', node_path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(node_path_1.default.join(__dirname, '../public')));
app.use('/', indexRoute_1.default);
app.use('/user', viewsRoute_1.default);
app.use('/api/user', userRoute_1.default);
app.use('/api/listing', listingRoute_1.default);
app.use('/api/todos', todos_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map