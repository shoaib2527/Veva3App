const Devices = [
  {
    Veva3: {
      iconSelector: 'zmdi-vibration',
      commands: [
        {
          label: '${get-status-label}',
          cmd: 'stat 3g',
          iconSelector: 'zmdi-plus-circle',
          responseValidation: 'MAC:.*HW:.*FW:.*',
          responsePattern:
            'MAC: (w{6})\r\nHW: (d.d)\r\nFW: (d.d.d)\r\nTemp: (dd.d)\r\nPwr: (w*)\r\nBat: (d.d)\r\n',
          cmdOutputMsg:
            '${serial-number} ${[0][1]}<br>${hw-version} ${[0][2]}<br>${fw-version} ${[0][3]}<br>${temperature} ${[0][4]}<br>${pwr-source} ${[0][5]}<br>${voltage} ${[0][6]}',
        },
        {
          label: '${manual-sample-label}',
          cmd: 'samp {sec} {sr} {range} {filter} {raw}',
          iconSelector: 'mzmdi-plus-circle',
          resposneValidation: 'PPV:.*PVS:.*AMP:.*',
          responsePattern: '/.*\r\n/gi',
          cmdOutputMsg: '${[2][1]}<br>${[3][1]}<br>${[4][1]}',
          cmdParams: [
            {
              sr: {
                label: '${sample-rate}',
                required: true,
                type: 'select',
                options: {
                  default: [
                    {
                      label: '1000 ${sample-rate-units}',
                      value: '1000',
                    },
                    {
                      label: '2000 ${sample-rate-units}',
                      value: '2000',
                    },
                    {
                      label: '4000 ${sample-rate-units}',
                      value: '4000',
                    },
                  ],
                },
              },
              sec: {
                label: '${seconds}',
                required: true,
                type: 'number',
                dependsOn: 'sr',
                validation: {
                  default: {
                    min: 0,
                    max: 30,
                  },
                  1000: {
                    min: 0,
                    max: 120,
                  },
                  2000: {
                    min: 0,
                    max: 60,
                  },
                },
              },
              range: {
                label: '${range}',
                required: true,
                type: 'select',
                options: {
                  default: [
                    {
                      label: '2G',
                      value: 2,
                    },
                    {
                      label: '4G',
                      value: 4,
                    },
                    {
                      label: '8G',
                      value: 8,
                    },
                  ],
                },
              },
              filter: {
                label: '${filter}',
                required: true,
                type: 'select',
                options: {
                  default: [
                    {
                      label: '${no-filter}',
                      value: 0,
                    },
                    {
                      label: 'ISEE',
                      value: 1,
                    },
                  ],
                },
                raw: {
                  label: '${raw-data}',
                  required: true,
                  type: 'select',
                  options: {
                    default: [
                      {
                        label: '${yes}',
                        value: 1,
                      },
                      {
                        label: '${no}',
                        value: 0,
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      ],
    },
  },
];
export default Devices;
