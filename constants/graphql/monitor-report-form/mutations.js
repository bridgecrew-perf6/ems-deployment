import { gql } from '@apollo/client'


export const UPSERT_GENSTATUS = gql`
mutation Mutation($inspectionId: Int, $batVoltage: Float, $syncroStat: String, $coolant: String, $fuelLevel: String, $engineOil: String, $upsertGeneratorStatusId: Int, $generatorId: Int) {
  upsertGeneratorStatus( inspection_id: $inspectionId, bat_voltage: $batVoltage, syncro_stat: $syncroStat, coolant: $coolant, fuel_level: $fuelLevel, engine_oil: $engineOil, id: $upsertGeneratorStatusId, generator_id: $generatorId) {
    id
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

export const UPSERT_POWCHECK = gql`
mutation Mutation($upsertPowerShiftId: Int, $inspectionId: Int, $mode: String, $lineVolt1: Float, $lineVolt2: Float, $lineVolt3: Float, $lineCurr1: Float, $lineCurr2: Float, $lineCurr3: Float, $durationStart: String, $durationEnd: String, $shiftOrder: Int, $frequency: Float, $powerType: String) {
  upsertPowerShift(id: $upsertPowerShiftId, inspection_id: $inspectionId, mode: $mode, line_volt_1: $lineVolt1, line_volt_2: $lineVolt2, line_volt_3: $lineVolt3, line_curr_1: $lineCurr1, line_curr_2: $lineCurr2, line_curr_3: $lineCurr3, duration_start: $durationStart, duration_end: $durationEnd, shift_order: $shiftOrder, frequency: $frequency, power_type: $powerType) {
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

export const UPSERT_PUMPCHECK = gql`
mutation UpsertPumpCheck($inspectionId: Int, $upsertPumpCheckId: Int, $pumpId: Int, $pumpMode: String, $pumpPressure: Float) {
    upsertPumpCheck(inspection_id: $inspectionId, id: $upsertPumpCheckId, pump_id: $pumpId, pump_mode: $pumpMode, pump_pressure: $pumpPressure) {
      id
      inspection_id
      pump_id
      pump_mode
      pump_pressure
      pump {
        id
        name
      }
      inspection {
        id
        monitoring_id
      }
    }
  }
`;

export const UPSERT_PUMPREAD = gql`
mutation UpsertPumpReading($pumpStationRead: Float, $upsertPumpReadingId: Int, $inspectionId: Int, $pumpRoomRead: Float, $stpDischargeRead: Float, $stpRecycledRead: Float, $mainKwhrRead: Float, $stpKwhrRead: Float) {
  upsertPumpReading(pump_station_read: $pumpStationRead, id: $upsertPumpReadingId, inspection_id: $inspectionId, pump_room_read: $pumpRoomRead, stp_discharge_read: $stpDischargeRead, stp_recycled_read: $stpRecycledRead, main_kwhr_read: $mainKwhrRead, stp_kwhr_read: $stpKwhrRead) {
      id
      inspection_id
      pump_room_read
      pump_station_read
      stp_discharge_read
      stp_recycled_read
      main_kwhr_read
      stp_kwhr_read
      deleted
      pump {
        id
        name
      }
      inspection {
        id
        monitoring_id
      }
    }
  }
`;

export const UPSERT_FIREPROT = gql`
mutation UpsertFirePressure($upsertFirePressureId: Int, $floorId: Int, $pressure: Float, $inspectionId: Int) {
    upsertFirePressure(id: $upsertFirePressureId, floor_id: $floorId, pressure: $pressure, inspection_id: $inspectionId) {
      id
      floor_id
      pressure
      inspection_id
      deleted
      inspection {
        id monitoring_id
      }
      floor {
        id num
      }
    }
  }
`;

export const DELETE_FIREPROT = gql`
mutation UpsertFirePressure($deleteFirePressureId: Int) {
    deleteFirePressure(id: $deleteFirePressureId) {
      id
      floor_id
      pressure
      inspection_id
      deleted
      inspection {
       id monitoring_id 
      }
      floor {
        id num
      }
    }
  }
`;

export const NEW_INSP = gql`
mutation Mutation($upsertInspectionId: Int, $timeInspected: String, $remarks: String, $monitoringId: Int, $inspectionIncharge: Int, $classification: String) {
  upsertInspection(id: $upsertInspectionId, time_inspected: $timeInspected, remarks: $remarks, monitoring_id: $monitoringId, inspection_incharge: $inspectionIncharge, classification: $classification) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id
      inspection_date
    }
    monitoring_id
    inspection_incharge
    deleted
    classification
  }
}
`;

export const UPSERT_POL = gql`
mutation UpsertPolutionControl($upsertPolutionControlId: Int, $quantity: Float, $unitId: Int, $inspectionId: Int, $wasteId: Int) {
  upsertPolutionControl(id: $upsertPolutionControlId, quantity: $quantity, unit_id: $unitId, inspection_id: $inspectionId, waste_id: $wasteId) {
    id
    quantity
    unit_id
    inspection_id
    waste_id
    inspection {
      id
      monitoring_id
    }
    unit {
      id
      name
    }
    waste {
      id
      name
    }
  }
}
`;

export const DELETE_POL = gql`
mutation DeletePolutionControl($deletePolutionControlId: Int) {
  deletePolutionControl(id: $deletePolutionControlId) {
    id
    quantity
    unit_id
    inspection_id
    waste_id
  }
}
`;

export const DELETE_GEN_POW = gql`
mutation Mutation($deleteGeneratorStatusId: Int) {
  deleteGeneratorStatus(id: $deleteGeneratorStatusId) {
    id
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

export const UPSERT_INSPECT = gql`
mutation UpsertInspection($timeInspected: String, $remarks: String, $monitoringId: Int, $upsertInspectionId: Int, $inspectionIncharge: Int, $classification: String, $deleted: Boolean) {
  upsertInspection(time_inspected: $timeInspected, remarks: $remarks, monitoring_id: $monitoringId, id: $upsertInspectionId, inspection_incharge: $inspectionIncharge, classification: $classification, deleted: $deleted) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id
      inspection_date
    }
    user {
      id username
    }
    monitoring_id
    inspection_incharge
    deleted
    classification
  }
}
`;