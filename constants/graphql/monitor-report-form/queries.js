import { gql } from '@apollo/client'

export const WASTE_NAMES = gql`
query Waste {
    waste {
      id
      name
    }
  }
`;

export const UNIT_NAMES = gql`
query Unit {
  unit {
    name
    id
  }
}
`;

export const FLOOR_NAMES = gql`
query Floor {
  floor {
    num
    id
  }
}
`;

export const PUMP_LIST = gql`
query Pump {
  pump {
    id
    name
  }
}
`;

export const REMARKS_REPORT = gql`
query Inspection {
  inspection {
    id
    time_inspected
    remarks
  }
}
`;

export const POL_INSP_ID = gql`
query PolutionControl {
  polutionControl {
    inspection_id
  }
}
`;

export const POW_INSP_ID = gql`
query Query($monitoringId: Int) {
  inspection_power(monitoring_id: $monitoringId) {
    id
  }
}
`;

export const INSP_WASTE = gql`
query Query($monitoringId: Int) {
  inspection_waste(monitoring_id: $monitoringId) {
    id
  }
}
`;

export const INSP_PUMP = gql`
query Query($monitoringId: Int) {
  inspection_pump(monitoring_id: $monitoringId) {
    id
  }
}
`;

export const INSP_FIRE = gql`
query Query($monitoringId: Int) {
  inspection_fire(monitoring_id: $monitoringId) {
    id
  }
}
`;
