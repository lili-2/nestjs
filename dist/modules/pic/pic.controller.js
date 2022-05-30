"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicController = void 0;
const common_1 = require("@nestjs/common");
var parseString = require('xml2js').parseString;
let PicController = class PicController {
    constructor() { }
    async savePic(req) {
        req.on('data', reqs => {
            parseString(reqs, function (err, result) {
                console.log(result);
                console.log(err);
            });
        });
        return 'heelo';
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PicController.prototype, "savePic", null);
PicController = __decorate([
    (0, common_1.Controller)('pic'),
    __metadata("design:paramtypes", [])
], PicController);
exports.PicController = PicController;
//# sourceMappingURL=pic.controller.js.map