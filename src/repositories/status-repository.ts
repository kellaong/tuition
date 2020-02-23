import { StatusEntity } from "../entities/status-entity";
import { getManager } from "typeorm";

export class StatusRepo {

  getAllStatus() {
    // get all status
    return getManager().getRepository(StatusEntity).find();
  }

  getStatusById(id :number) {
    // get all status
    return getManager().getRepository(StatusEntity).findOne(id);
  }

  saveStatus(status: StatusEntity) { 
    return getManager().getRepository(StatusEntity).save(status);
  }
}