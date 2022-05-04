import { gql } from '@apollo/client';

export const ADD_UPD_DAILYMON = gql`
mutation UpsertDailyMonitor($id: Int, $census_count: Int, $important_notes: String, $inspection_date: String) {
  upsertDailyMonitor(id: $id, census_count: $census_count, important_notes: $important_notes, inspection_date: $inspection_date) {
    id
    census_count
    important_notes
    inspection_date
  }
}
`;

export const ADD_UPD_INSPECTION = gql`
mutation UpsertInspection($id: Int, $timeInspected: String, $remarks: String, $monitoringId: Int, $inspectionIncharge: Int) {
  upsertInspection(id: $id, time_inspected: $timeInspected, remarks: $remarks, monitoring_id: $monitoringId, inspection_incharge: $inspectionIncharge) {
    id
    time_inspected
    monitoring_id
    remarks
    inspection_incharge
  }
}
`;

export const ADD_UPD_POLUTION = gql`
mutation UpsertPolutionControl($id: Int, $quantity: Float, $unitId: Int, $inspectionId: Int, $wasteId: Int) {
  upsertPolutionControl(id: $id, quantity: $quantity, unit_id: $unitId, inspection_id: $inspectionId, waste_id: $wasteId) {
    id
    quantity
    unit_id
    inspection_id
    waste_id
  }
}
`;

export const DELETE_INSPECTION = gql`
mutation DeleteInspection($id: Int) {
  deleteInspection(id: $id) {
    id
  }
}
`;

export const DELETE_POLUTION = gql`
mutation DeletePolutionControl($id: Int) {
  deletePolutionControl(id: $id) {
    id
  }
}
`;

export const DELETE_DAILYMON = gql`
mutation DeleteDailyMonitor($id: Int) {
  deleteDailyMonitor(id: $id) {
    id
  }
}
`;

export const ADD_UPD_POWERHOUSE = gql`
mutation Mutation($upsertPowerShiftId: Int, $inspectionId: Int, $mode: String, $lineVolt1: Float, $lineVolt2: Float, $lineVolt3: Float, $lineCurr1: Float, $lineCurr2: Float, $lineCurr3: Float, $durationStart: String, $durationEnd: String, $shiftOrder: Int, $powerType: String, $frequency: Float) {
  upsertPowerShift(id: $upsertPowerShiftId, inspection_id: $inspectionId, mode: $mode, line_volt_1: $lineVolt1, line_volt_2: $lineVolt2, line_volt_3: $lineVolt3, line_curr_1: $lineCurr1, line_curr_2: $lineCurr2, line_curr_3: $lineCurr3, duration_start: $durationStart, duration_end: $durationEnd, shift_order: $shiftOrder, power_type: $powerType, frequency: $frequency) {
    id
    inspection_id
    mode
    line_volt_1
    line_volt_2
    line_volt_3
    line_curr_1
    line_curr_2
    line_curr_3
    duration_start
    duration_end
    shift_order
    power_type
    deleted
    inspection {
      id
      monitoring_id
    }
    frequency
  }
}
`;

export const ADD_UPD_GENERATORSTATUS = gql`
mutation Mutation($upsertGeneratorStatusId: Int, $generatorId: Int, $inspectionId: Int, $batVoltage: Float, $syncroStat: String, $coolant: String, $deleted: Boolean, $fuelLevel: String, $engineOil: String) {
  upsertGeneratorStatus(id: $upsertGeneratorStatusId, generator_id: $generatorId, inspection_id: $inspectionId, bat_voltage: $batVoltage, syncro_stat: $syncroStat, coolant: $coolant, deleted: $deleted, fuel_level: $fuelLevel, engine_oil: $engineOil) {
    id
    generator_id
    generator {
      id
      name
    }
    inspection_id
    inspection {
      id
      monitoring_id
    }
    bat_voltage
    syncro_stat
    coolant
    deleted
    fuel_level
    engine_oil
  }
}
`;

export const DEL_FIRE_PROT = gql`
mutation DeleteFirePressure($deleteFirePressureId: Int) {
  deleteFirePressure(id: $deleteFirePressureId) {
    id
    floor_id
    pressure
    inspection_id
    deleted
  }
}
`;

export const UPSERT_INSPECT = gql`
mutation UpsertInspection($upsertInspectionId: Int, $timeInspected: String, $remarks: String, $inspectionIncharge: Int, $classification: String, $monitoringId: Int) {
  upsertInspection(id: $upsertInspectionId, time_inspected: $timeInspected, remarks: $remarks, inspection_incharge: $inspectionIncharge, classification: $classification, monitoring_id: $monitoringId) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id
      inspection_date
    }
    user {
      id
      username
    }
    monitoring_id
    inspection_incharge
    deleted
    classification
  }
}
`;

export const DELETE_POWERCHECK = gql`
mutation DeletePolutionControl($id: Int) {
  deletePowerShift(id: $id) {
    id
    inspection_id
    mode
    line_volt_1
    line_volt_2
    line_volt_3
    line_curr_1
    line_curr_2
    line_curr_3
    duration_start
    duration_end
    shift_order
    power_type
    deleted
    frequency
  }
}
`;

export const DELETE_PUMP_CHECK = gql`
mutation Mutation($deletePumpCheckId: Int) {
  deletePumpCheck(id: $deletePumpCheckId) {
    id
    inspection_id
    pump_id
    pump_mode
    pump_pressure
    deleted
    inspection {
      id
      monitoring_id
    }
    pump {
      id
      name
    }
  }
}
`;

export const DELETE_PUMP_STAT = gql`
mutation DeletedPumpReading($deletedPumpReadingId: Int) {
  deletePumpReading(id: $deletedPumpReadingId) {
    id
    inspection_id
    pump_room_read
    pump_station_read
    stp_discharge_read
    stp_recycled_read
    main_kwhr_read
    stp_kwhr_read
    deleted
    inspection {
      id
      monitoring_id
    }
  }
}
`;

export const DELETE_FIRE = gql`
mutation DeleteFirePressure($deleteFirePressureId: Int) {
  deleteFirePressure(id: $deleteFirePressureId) {
    id
    floor_id
    pressure
    inspection_id
    deleted
    inspection {
      id
      monitoring_id
    }
    floor {
      id
      num
    }
  }
}
`;

export const UPSERT_FIRE = gql`
mutation UpsertFirePressure($upsertFirePressureId: Int, $pressure: Float, $floorId: Int, $inspectionId: Int) {
  upsertFirePressure(id: $upsertFirePressureId, pressure: $pressure, floor_id: $floorId, inspection_id: $inspectionId) {
    id
    floor_id
    pressure
    inspection_id
    deleted
    inspection {
      id
      monitoring_id
    }
    floor {
      id
      num
    }
  }
}
`;

export const UPSERT_REMARK = gql`
mutation UpsertInspection($upsertInspectionId: Int, $timeInspected: String, $remarks: String, $monitoringId: Int, $inspectionIncharge: Int, $classification: String) {
  upsertInspection(id: $upsertInspectionId, time_inspected: $timeInspected, remarks: $remarks, monitoring_id: $monitoringId, inspection_incharge: $inspectionIncharge, classification: $classification) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id
      inspection_date
    }
    user {
      id
      username
    }
    monitoring_id
    inspection_incharge
    deleted
    classification
  }
}
`;