import {gql} from '@apollo/client'

export const USER_LIST = gql`
query UserEnum {
  userEnum {
    username
    id
  }
}
`;

export const DAILY_REPORT = gql`
query DailyRecord($id: Int) {
  dailyRecord(id: $id) {
    id
    census_count
    important_notes
    inspection_date
  }
}
`;

export const REPORT_LIST = gql`
query DailyMonitoring {
    dailyMonitoring {
      id
      census_count
      important_notes
      inspection_date
    }
  }
`;
  


export const GENERATOR_LIST = gql`
query Generators {
  generators {
    id
    name
    description
    deleted
  }
}
`;

export const INSP_LIST = gql`
query Inspection($id: Int) {
  inspection(monitoring_id: $id) {
    id
    monitoring_id
    inspection_incharge
    remarks
    time_inspected
    deleted
  }
}
`;

export const POLUTION_LIST = gql`
query PolutionInspection($monitoringId: Int) {
  polutionInspection(monitoring_id: $monitoringId) {
    id
    quantity
    unit_id
    inspection_id
    waste_id
    inspection {
      id
      classification
      time_inspected
      remarks
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

export const GEN_STAT_LIST = gql`
query Query ($monitoringId: Int){
  generator_status( monitoring_id: $monitoringId) {
    id
    inspection_id
    bat_voltage
    syncro_stat
    coolant
    deleted
    fuel_level
    engine_oil
    generator {
      id
      name
    }
    inspection {
      id
      classification
      time_inspected
      remarks
      monitoring_id
    }
  }
}
`;

export const POW_SHIFT_LIST = gql`
query PowershiftReading($monitoringId: Int) {
  powershiftReading(monitoring_id: $monitoringId) {
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
      classification
      time_inspected
      remarks
      monitoring_id
    }
    frequency
  }
}
`;

export const PUMP_CHECK_LIST = gql`
query PumpCheckDisplay($monitoringId: Int) {
  pumpCheckDisplay(monitoring_id: $monitoringId) {
    id
    inspection_id
    pump_id
    pump_mode
    pump_pressure
    deleted
    inspection {
      id
      classification
      time_inspected
      remarks
      monitoring_id
    }
    pump {
      id
      name
      deleted
    }
  }
}
`;

export const PUMP_READ_LIST = gql`
query PumpReading($monitoringId: Int) {
  pumpReading(monitoring_id: $monitoringId) {
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
      classification
      time_inspected
      remarks
      monitoring_id
    }
  }
}
`;

export const FIRE_PRES_LIST = gql`
query FirePressures($monitoringId: Int) {
  firePressures(monitoring_id: $monitoringId) {
    id
    floor_id
    pressure
    inspection_id
    deleted
    inspection {
      id
      classification
      time_inspected
      remarks
      monitoring_id
    }
    floor {
      id
      num
    }
  }
}
`;

export const REMARKS_POW = gql`
query Inspection_power($monitoringId: Int) {
 data: inspection_power(monitoring_id: $monitoringId) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id
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

export const REMARKS_PUMP = gql`
query Inspection_pump($monitoringId: Int) {
  data: inspection_pump(monitoring_id: $monitoringId) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id 
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

export const REMARKS_FIRE = gql`
query Inspection_fire($monitoringId: Int) {
  data: inspection_fire(monitoring_id: $monitoringId) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id
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

export const REMARKS_WASTE = gql`
query Inspection_waste($monitoringId: Int) {
  data: inspection_waste(monitoring_id: $monitoringId) {
    id
    time_inspected
    remarks
    daily_monitoring {
      id
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

export const DAILY_DATE_CHECK = gql`
query Query {
  dailyMonitoring {
    inspection_date
  }
}
`;