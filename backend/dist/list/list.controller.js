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
exports.ListController = void 0;
const common_1 = require("@nestjs/common");
const list_service_1 = require("./list.service");
const create_list_dto_1 = require("./dto/create-list.dto");
const update_list_dto_1 = require("./dto/update-list.dto");
const user_service_1 = require("../user/user.service");
let ListController = class ListController {
    constructor(listService, userService) {
        this.listService = listService;
        this.userService = userService;
    }
    async create(createListDto) {
        const userDetails = await this.userService.findOne(createListDto.user);
        return this.listService.create(createListDto, userDetails);
    }
    findAll() {
        return this.listService.findAll();
    }
    findOne(id) {
        return this.listService.findOne(+id);
    }
    async findUserItems(userId) {
        const user = await this.userService.findOne(userId);
        return this.listService.findUserItems(user);
    }
    update(id, updateListDto) {
        return this.listService.update(+id, updateListDto);
    }
    remove(id) {
        return this.listService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_list_dto_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ListController.prototype, "findUserItems", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_list_dto_1.UpdateListDto]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ListController.prototype, "remove", null);
ListController = __decorate([
    (0, common_1.Controller)('list'),
    __metadata("design:paramtypes", [list_service_1.ListService,
        user_service_1.UserService])
], ListController);
exports.ListController = ListController;
//# sourceMappingURL=list.controller.js.map