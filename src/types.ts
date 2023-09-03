import { z } from "zod";

export const ZColor = z.enum(['ll', 'reb', 'cpg', 'c', 'dg'])

export type IColor = z.infer<typeof ZColor>

export const colorHexDict: { [key in IColor]: string } = {
  ll: '#2660a4ff', // 'lapis-lazuli'
  reb: '#55dde0ff', // 'robin-egg-blue'
  cpg: '#28502eff', // 'cal-poly-green
  c: '#c47335ff', // 'copper'
  dg: '#7b7263ff', // 'dim-gray'
}
export type ICoordinate = {
  lat: number;
  lon: number;
};
export type IMarker = {
  id: string;
  color: IColor;
  latLon: ICoordinate;
};

export type ITimeseries = {
  marker: IMarker;
  data: {
    midDateArray: Date[];
    velocityArray: number[];
  };
};

export type IGlacier = {
  name: string;
  markers: Array<IMarker>;
  zoomLevel: number;
  center: ICoordinate;
};
export type IRegion = string;

export const glaciersDict: Record<IRegion, Array<IGlacier>> = {
  "Greenland": [
    {
      "name": "Sermeq Kujalleq [Jakobshavns Isbrae]",
      "markers": [
        {
          "id": "rwlgga3nw0g3advqwjnep561",
          "color": "ll",
          "latLon": {
            "lat": 69.13788,
            "lon": -49.55383
          }
        },
        {
          "id": "q2472djlsv14ezorwqklzwe0",
          "color": "cpg",
          "latLon": {
            "lat": 69.10752,
            "lon": -49.4577
          }
        },
        {
          "id": "qx3l78hth2bikeryya3id4ip",
          "color": "reb",
          "latLon": {
            "lat": 69.11634,
            "lon": -49.25171
          }
        },
        {
          "id": "ovqp2lz33p7gh1jpf3sudayp",
          "color": "c",
          "latLon": {
            "lat": 69.13886,
            "lon": -49.04022
          }
        }
      ],
      "zoomLevel": 9,
      "center": {
        "lat": 69.13788,
        "lon": -49.55383
      }
    },
    {
      "name": "Helheim Glacier",
      "markers": [
        {
          "id": "tsb9wdlyykfphfma98aiwr74",
          "color": "ll",
          "latLon": {
            "lat": 66.36464,
            "lon": -38.2077
          }
        },
        {
          "id": "qv6pdqqfj83l5tf3rkhetozx",
          "color": "cpg",
          "latLon": {
            "lat": 66.41196,
            "lon": -38.37799
          }
        },
        {
          "id": "y1yon0sd2tknp6pnglkbitte",
          "color": "reb",
          "latLon": {
            "lat": 66.51839,
            "lon": -38.53455
          }
        },
        {
          "id": "jkva7br0pe1ytdichfbi9ja4",
          "color": "c",
          "latLon": {
            "lat": 66.59163,
            "lon": -38.71033
          }
        }
      ],
      "zoomLevel": 9,
      "center": {
        "lat": 66.41196,
        "lon": -38.37799
      }
    },
    {
      "name": "Narsap Sermia",
      "markers": [
        {
          "id": "d9gkqphgh8dzkxx8to652p7w",
          "color": "ll",
          "latLon": {
            "lat": 64.64506,
            "lon": -49.94934
          }
        },
        {
          "id": "vcktmn4nf6ca15o5cv8pfu0y",
          "color": "cpg",
          "latLon": {
            "lat": 64.6674,
            "lon": -49.8587
          }
        },
        {
          "id": "hts6xmfsbmecv94c5h80s82i",
          "color": "reb",
          "latLon": {
            "lat": 64.70849,
            "lon": -49.65546
          }
        },
        {
          "id": "plhv53m0z0j615om4z2mjyhw",
          "color": "c",
          "latLon": {
            "lat": 64.74553,
            "lon": -49.36157
          }
        }
      ],
      "zoomLevel": 9,
      "center": {
        "lat": 64.64506,
        "lon": -49.94934
      }
    },
    {
      "name": "Zacharie Isstrom",
      "markers": [
        {
          "id": "v3l8p740f3tthm2jxqsnmsx0",
          "color": "ll",
          "latLon": {
            "lat": 78.90276,
            "lon": -20.56091
          }
        },
        {
          "id": "cyrgphye6xm08rq518xwpw6q",
          "color": "cpg",
          "latLon": {
            "lat": 78.91227,
            "lon": -21.00037
          }
        },
        {
          "id": "vqxx2uzljpukjx2jt5uk3f1n",
          "color": "reb",
          "latLon": {
            "lat": 78.90434,
            "lon": -21.46179
          }
        },
        {
          "id": "ycttyilrtwq02ekv60y0ya0p",
          "color": "c",
          "latLon": {
            "lat": 78.88847,
            "lon": -21.87378
          }
        }
      ],
      "zoomLevel": 8,
      "center": {
        "lat": 78.91227,
        "lon": -21.00037
      }
    }
  ],
  "Antarctica": [
    {
      "name": "Pine Island Glacier",
      "markers": [
        {
          "id": "sx0zgmljciykupl8v7ryu6e7",
          "color": "ll",
          "latLon": {
            "lat": -75.0296,
            "lon": -100.88196
          }
        },
        {
          "id": "c6bxntuwfa0xc6qe716h94fg",
          "color": "cpg",
          "latLon": {
            "lat": -75.19479,
            "lon": -99.63501
          }
        },
        {
          "id": "ze5qskwcx6na83al6woi6r79",
          "color": "reb",
          "latLon": {
            "lat": -75.34291,
            "lon": -98.49243
          }
        },
        {
          "id": "k7lyhzpp4fk3gq3zf1z0fhi3",
          "color": "c",
          "latLon": {
            "lat": -75.41994,
            "lon": -96.9104
          }
        }
      ],
      "zoomLevel": 7,
      "center": {
        "lat": -75.19479,
        "lon": -99.63501
      }
    },
    {
      "name": "Thwaites Glacier",
      "markers": [
        {
          "id": "xqfo9wkf4jhgoqhywmgrpjmm",
          "color": "ll",
          "latLon": {
            "lat": -75.21399,
            "lon": -106.61133
          }
        },
        {
          "id": "ta90ybdidgri1qy6vw8h0en3",
          "color": "cpg",
          "latLon": {
            "lat": -75.44225,
            "lon": -106.90247
          }
        },
        {
          "id": "hgtjyytishbc4kblojjqgu5n",
          "color": "reb",
          "latLon": {
            "lat": -75.63302,
            "lon": -107.39685
          }
        },
        {
          "id": "ewsde25xzasum0wnmaeaczzt",
          "color": "c",
          "latLon": {
            "lat": -75.80113,
            "lon": -107.93518
          }
        }
      ],
      "zoomLevel": 7,
      "center": {
        "lat": -75.44225,
        "lon": -106.90247
      }
    }
  ],
  "South America": [
    {
      "name": "Upsala Glacier",
      "markers": [
        {
          "id": "ndo1pgeo2ttadt4714qsh5sy",
          "color": "ll",
          "latLon": {
            "lat": -49.88976,
            "lon": -73.28018
          }
        },
        {
          "id": "dsajyu9n3w38jbtwpxyethhl",
          "color": "cpg",
          "latLon": {
            "lat": -49.83636,
            "lon": -73.26782
          }
        },
        {
          "id": "z9bmouuoab2omv5x963d10a2",
          "color": "reb",
          "latLon": {
            "lat": -49.76631,
            "lon": -73.27744
          }
        },
        {
          "id": "kop0lnvx502i50owsmr4yg49",
          "color": "c",
          "latLon": {
            "lat": -49.68638,
            "lon": -73.31451
          }
        }
      ],
      "zoomLevel": 10,
      "center": {
        "lat": -49.83636,
        "lon": -73.26782
      }
    }
  ],
  "Alaska/Yukon": [
    {
      "name": "Malaspina Glacier",
      "markers": [
        {
          "id": "o7vpb0a5k2tgma1thrr5ry47",
          "color": "ll",
          "latLon": {
            "lat": 60.08343,
            "lon": -140.46707
          }
        },
        {
          "id": "cylbkjm6pa7h4b5joi7rhrp8",
          "color": "cpg",
          "latLon": {
            "lat": 60.02582,
            "lon": -140.57831
          }
        },
        {
          "id": "yr3zkgnrz98o7rctg1iklbp8",
          "color": "reb",
          "latLon": {
            "lat": 59.92546,
            "lon": -140.72388
          }
        },
        {
          "id": "kcvu062cvp4tebw3mu32b0zh",
          "color": "c",
          "latLon": {
            "lat": 59.83722,
            "lon": -140.80765
          }
        }
      ],
      "zoomLevel": 8,
      "center": {
        "lat": 60.02582,
        "lon": -140.57831
      }
    },
    {
      "name": "Hubbard Glacier",
      "markers": [
        {
          "id": "l52zqzll5a6glmog0zje9vdl",
          "color": "ll",
          "latLon": {
            "lat": 60.01467,
            "lon": -139.48654
          }
        },
        {
          "id": "t12z63ti4bgmaz6b91a5m4e6",
          "color": "cpg",
          "latLon": {
            "lat": 60.04075,
            "lon": -139.41101
          }
        },
        {
          "id": "hxmde543ehepjy520yuvvcer",
          "color": "reb",
          "latLon": {
            "lat": 60.0579,
            "lon": -139.32449
          }
        },
        {
          "id": "ysas7heukxidj689kbc5kd65",
          "color": "c",
          "latLon": {
            "lat": 60.11476,
            "lon": -139.30252
          }
        }
      ],
      "zoomLevel": 10,
      "center": {
        "lat": 60.01467,
        "lon": -139.48654
      }
    },
    {
      "name": "Columbia Glacier",
      "markers": [
        {
          "id": "u94i0rk7esremdnp93t52kca",
          "color": "ll",
          "latLon": {
            "lat": 61.17371,
            "lon": -146.99432
          }
        },
        {
          "id": "j77szeb5fcz7t1yvdurni2fi",
          "color": "cpg",
          "latLon": {
            "lat": 61.18993,
            "lon": -146.93939
          }
        },
        {
          "id": "hup1867qpgytcurn7kpj67kw",
          "color": "reb",
          "latLon": {
            "lat": 61.21525,
            "lon": -146.90643
          }
        },
        {
          "id": "arluymxs5d77nx2mdz22w7gr",
          "color": "c",
          "latLon": {
            "lat": 61.25822,
            "lon": -146.91193
          }
        }
      ],
      "zoomLevel": 10,
      "center": {
        "lat": 61.17371,
        "lon": -146.99432
      }
    },
    {
      "name": "Klutlan Glacier",
      "markers": [
        {
          "id": "q2cgg0gvmzcvb4e98n2dd91x",
          "color": "ll",
          "latLon": {
            "lat": 61.4578,
            "lon": -141.21414
          }
        },
        {
          "id": "jo9bpdy98c7kpae6kifwvhs0",
          "color": "cpg",
          "latLon": {
            "lat": 61.45058,
            "lon": -141.04935
          }
        },
        {
          "id": "wzg7868vlhc0a3cv155uhyhc",
          "color": "reb",
          "latLon": {
            "lat": 61.44597,
            "lon": -140.83443
          }
        },
        {
          "id": "awspcvvwyhgdkvlrlfwqvhvv",
          "color": "c",
          "latLon": {
            "lat": 61.45812,
            "lon": -140.64423
          }
        }
      ],
      "zoomLevel": 9,
      "center": {
        "lat": 61.45058,
        "lon": -141.04935
      }
    }
  ],
  "Canadian Arctic": [
    {
      "name": "Trinity Glacier",
      "markers": [
        {
          "id": "v8p1f0aj1s6yo0tvl5b4orso",
          "color": "ll",
          "latLon": {
            "lat": 78.03325,
            "lon": -79.22653
          }
        },
        {
          "id": "rca45f0q0klzibf0zw34n3z0",
          "color": "cpg",
          "latLon": {
            "lat": 78.04407,
            "lon": -78.87497
          }
        },
        {
          "id": "j6pj2ittr9wg93oqwxrrawuj",
          "color": "reb",
          "latLon": {
            "lat": 78.00473,
            "lon": -78.71704
          }
        },
        {
          "id": "oljz0f33p505tilcleb3u1yl",
          "color": "c",
          "latLon": {
            "lat": 77.96044,
            "lon": -78.5495
          }
        }
      ],
      "zoomLevel": 9,
      "center": {
        "lat": 78.00473,
        "lon": -78.71704
      }
    }
  ],
  "Svalbard": [
    {
      "name": "Storisstraumen",
      "markers": [
        {
          "id": "ye1mx73t36ahp3pud44vik4t",
          "color": "ll",
          "latLon": {
            "lat": 79.45549,
            "lon": 24.9884
          }
        },
        {
          "id": "knchrs4opkm0a5p81ql3fwif",
          "color": "cpg",
          "latLon": {
            "lat": 79.50065,
            "lon": 24.64783
          }
        },
        {
          "id": "xb46sgkxepgxc992x4imdtc9",
          "color": "reb",
          "latLon": {
            "lat": 79.56653,
            "lon": 24.22485
          }
        },
        {
          "id": "cxd3re0rlvp2gx3r297ud9vf",
          "color": "c",
          "latLon": {
            "lat": 79.68331,
            "lon": 23.9502
          }
        }
      ],
      "zoomLevel": 8,
      "center": {
        "lat": 79.50065,
        "lon": 24.64783
      }
    }
  ]
}