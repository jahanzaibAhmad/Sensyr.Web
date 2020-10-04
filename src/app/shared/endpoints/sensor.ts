export class SensorEndPoints {
    public readonly getAlarmsEndPoint = 'GetAlarms';
    public readonly getIndividualSensorsEndPoint = 'GetIndividualSensors';
    public readonly getSensorGroupsEndPoint = 'GetSensorGroups';
    public readonly getAlarmsStatusesEndPoint = 'GetAlarmsStatuses';
    public readonly getTotalAlarmsStatusesEndPoint = 'GetTotalAlarmsStatuses';
    public readonly getSensorsByGroupIdEndPoint = 'GetSensorsByGroupId';
    public readonly getSensorByIdEndPoint = 'getSensorById';
    public readonly getSensorGroupSensorsPerformanceEndPoint = 'GetSensorGroupSensorsPerformance';
    public readonly deleteSensorsEndPoint = 'DeleteSensors';
    public readonly getSensorDetailAnalyticsPerformanceEndPoint = 'GetSensorDetailAnalyticsPerformance';
    public readonly getSensorDetailAnalyticsStatusEndPoint = 'GetSensorDetailAnalyticsStatus';
    public readonly getSensorDetailLastTransactionsEndPoint = 'GetSensorDetailLastTransactions';
    public readonly getAttachSensorsForPortGatewaySearchEndPoint = 'GetAttachSensorsForPortGatewaySearch';
    public readonly getGatewayPortSensorDetailsEndPoint = 'GetGatewayPortSensorDetails';
}

export class DashboardEndPoints {
    public readonly getTotalMachinesGroupsSensorsEndPoint = 'GetTotalMachinesGroupsSensors';
}
