"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_entity_1 = require("../entities/status-entity");
const typeorm_1 = require("typeorm");
class StatusRepo {
    getAllStatus() {
        // get all status
        return typeorm_1.getManager().getRepository(status_entity_1.StatusEntity).find();
    }
    getStatusById(id) {
        // get all status
        return typeorm_1.getManager().getRepository(status_entity_1.StatusEntity).findOne(id);
    }
    saveStatus(status) {
        return typeorm_1.getManager().getRepository(status_entity_1.StatusEntity).save(status);
    }
}
exports.StatusRepo = StatusRepo;
//# sourceMappingURL=status-repository.js.map