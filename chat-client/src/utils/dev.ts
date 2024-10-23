function randomId(): string {
    return Math.random().toString(36).substring(2, 10);
}

function randomEmail(): string {
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const name = Math.random().toString(36).substring(2, 8);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${name}@${domain}`;
}

function randomDate(): string {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
}

function randomMessageFrom(): MessageFrom {
    const fromTypes = ['ME', 'OTHERS'] as const;
    return fromTypes[Math.floor(Math.random() * fromTypes.length)];
}

function randomMessage(): Message {
    return {
        _id: randomId(),
        from: randomMessageFrom(),
        message: `Message ${Math.random().toString(36).substring(7)}`,
        createdAt: randomDate()
    };
}

function createRoom(): Room {
    const messagesCount = Math.floor(Math.random() * 10) + 1;
    const messages = Array.from({ length: messagesCount }, randomMessage);

    return {
        _id: randomId(),
        email: randomEmail(),
        messages,
        createdAt: randomDate()
    };
}

export function generateRooms(n: number): Room[] {
    return Array.from({ length: n }, createRoom);
}

export function getRooms(): Room[] {
    return [
        {
            "_id": "cb7cdgyp",
            "email": "9gp5nk@outlook.com",
            "messages": [
                {
                    "_id": "p1j8lnqq",
                    "from": "ME",
                    "message": "Message oxeaqd",
                    "createdAt": "2022-03-31T22:14:05.276Z"
                },
                {
                    "_id": "9nehu4j3",
                    "from": "ME",
                    "message": "Message vjleoi",
                    "createdAt": "2023-11-10T02:47:54.880Z"
                },
                {
                    "_id": "mpmcjylb",
                    "from": "OTHERS",
                    "message": "Message na8a78",
                    "createdAt": "2023-11-10T17:50:06.952Z"
                },
                {
                    "_id": "jfhmndmi",
                    "from": "ME",
                    "message": "Message qqz97c",
                    "createdAt": "2020-12-29T15:50:59.844Z"
                },
                {
                    "_id": "82syx950",
                    "from": "OTHERS",
                    "message": "Message 6r0vb4",
                    "createdAt": "2022-08-20T11:15:24.905Z"
                },
                {
                    "_id": "jqluzntl",
                    "from": "ME",
                    "message": "Message u34xo",
                    "createdAt": "2022-12-27T13:43:32.092Z"
                },
                {
                    "_id": "2dcql9zl",
                    "from": "ME",
                    "message": "Message 948wfe",
                    "createdAt": "2020-11-14T00:05:25.607Z"
                }
            ],
            "createdAt": "2024-01-15T08:56:23.682Z"
        },
        {
            "_id": "ljhynazv",
            "email": "8zj7wv@yahoo.com",
            "messages": [
                {
                    "_id": "ium3ov4a",
                    "from": "OTHERS",
                    "message": "Message q1bb19",
                    "createdAt": "2023-05-02T18:49:22.359Z"
                },
                {
                    "_id": "8joanxoh",
                    "from": "OTHERS",
                    "message": "Message jnr68c2o",
                    "createdAt": "2021-11-30T01:19:30.405Z"
                },
                {
                    "_id": "17mx9qmg",
                    "from": "OTHERS",
                    "message": "Message 929ds",
                    "createdAt": "2021-07-01T21:46:07.127Z"
                },
                {
                    "_id": "j6uu5dpp",
                    "from": "OTHERS",
                    "message": "Message x5dh",
                    "createdAt": "2020-02-11T13:35:03.948Z"
                },
                {
                    "_id": "dqcqu9vm",
                    "from": "ME",
                    "message": "Message f2t51o",
                    "createdAt": "2020-07-02T22:02:45.838Z"
                },
                {
                    "_id": "6ksf3qzg",
                    "from": "OTHERS",
                    "message": "Message kyr7mq",
                    "createdAt": "2022-11-05T03:26:58.238Z"
                },
                {
                    "_id": "b4m3haj5",
                    "from": "OTHERS",
                    "message": "Message hiua7",
                    "createdAt": "2021-08-07T12:13:02.760Z"
                },
                {
                    "_id": "r7wvr0hx",
                    "from": "OTHERS",
                    "message": "Message 6y8ip",
                    "createdAt": "2023-05-09T07:47:27.414Z"
                },
                {
                    "_id": "v2dcf4nf",
                    "from": "ME",
                    "message": "Message 44fsr",
                    "createdAt": "2021-10-09T20:04:43.390Z"
                }
            ],
            "createdAt": "2022-01-02T00:00:02.409Z"
        },
        {
            "_id": "wht13dnv",
            "email": "ham5zq@gmail.com",
            "messages": [
                {
                    "_id": "59nm3841",
                    "from": "OTHERS",
                    "message": "Message xbolnn",
                    "createdAt": "2020-05-25T23:03:12.516Z"
                },
                {
                    "_id": "wgsorsmh",
                    "from": "ME",
                    "message": "Message whssx",
                    "createdAt": "2022-07-18T12:37:26.469Z"
                }
            ],
            "createdAt": "2020-09-14T14:22:14.235Z"
        },
        {
            "_id": "loc55tmt",
            "email": "kwwkfd@outlook.com",
            "messages": [
                {
                    "_id": "qrzpwkr4",
                    "from": "OTHERS",
                    "message": "Message 0wuvfn",
                    "createdAt": "2023-04-30T02:12:10.457Z"
                },
                {
                    "_id": "cd1oq6oe",
                    "from": "ME",
                    "message": "Message tbnwcb",
                    "createdAt": "2024-01-26T13:55:40.027Z"
                },
                {
                    "_id": "lrm5v3zy",
                    "from": "OTHERS",
                    "message": "Message femtoo",
                    "createdAt": "2020-08-02T02:31:59.011Z"
                },
                {
                    "_id": "4vmfwpiv",
                    "from": "ME",
                    "message": "Message tm45n",
                    "createdAt": "2020-01-04T16:52:59.236Z"
                },
                {
                    "_id": "3750jxen",
                    "from": "OTHERS",
                    "message": "Message gl6f9l",
                    "createdAt": "2021-10-06T07:54:59.569Z"
                },
                {
                    "_id": "kgoss426",
                    "from": "ME",
                    "message": "Message uz7lxu",
                    "createdAt": "2021-11-03T22:31:18.470Z"
                }
            ],
            "createdAt": "2022-07-01T16:06:31.908Z"
        },
        {
            "_id": "5lxhlk9y",
            "email": "dgh3ei@outlook.com",
            "messages": [
                {
                    "_id": "wbtr0w0z",
                    "from": "OTHERS",
                    "message": "Message w18ujk",
                    "createdAt": "2021-02-13T17:19:26.432Z"
                },
                {
                    "_id": "bd7wux7o",
                    "from": "OTHERS",
                    "message": "Message paqykl",
                    "createdAt": "2022-10-09T19:42:48.001Z"
                },
                {
                    "_id": "yzbz8doa",
                    "from": "OTHERS",
                    "message": "Message ine7xg",
                    "createdAt": "2021-07-12T07:41:54.166Z"
                }
            ],
            "createdAt": "2024-04-26T12:58:18.153Z"
        },
        {
            "_id": "kecvllzk",
            "email": "k7d2su@gmail.com",
            "messages": [
                {
                    "_id": "yi7y3bag",
                    "from": "ME",
                    "message": "Message 6yoe8",
                    "createdAt": "2021-04-30T15:10:56.463Z"
                },
                {
                    "_id": "ycqt9w9w",
                    "from": "OTHERS",
                    "message": "Message h4xlmt",
                    "createdAt": "2021-07-19T01:15:41.657Z"
                },
                {
                    "_id": "eyifuug8",
                    "from": "ME",
                    "message": "Message 2ohjbu",
                    "createdAt": "2022-07-25T05:28:28.627Z"
                },
                {
                    "_id": "bk0ohxn4",
                    "from": "ME",
                    "message": "Message bmld1c",
                    "createdAt": "2023-10-27T19:02:48.704Z"
                },
                {
                    "_id": "kbvh6xcs",
                    "from": "ME",
                    "message": "Message dyu2dy",
                    "createdAt": "2022-09-30T04:58:15.194Z"
                },
                {
                    "_id": "c0xjmjp3",
                    "from": "OTHERS",
                    "message": "Message 6ocrjo",
                    "createdAt": "2024-05-04T01:21:05.687Z"
                }
            ],
            "createdAt": "2024-03-13T11:05:38.081Z"
        },
        {
            "_id": "p7q9usng",
            "email": "xjjupn@gmail.com",
            "messages": [
                {
                    "_id": "nlgoq6wt",
                    "from": "OTHERS",
                    "message": "Message a75sxd",
                    "createdAt": "2024-06-30T00:34:08.120Z"
                },
                {
                    "_id": "jj7b7ixw",
                    "from": "ME",
                    "message": "Message 9s26i",
                    "createdAt": "2022-11-24T03:10:43.757Z"
                },
                {
                    "_id": "5h7extx0",
                    "from": "ME",
                    "message": "Message symkis",
                    "createdAt": "2024-03-21T00:30:34.592Z"
                },
                {
                    "_id": "ymneimby",
                    "from": "ME",
                    "message": "Message ifgn4g",
                    "createdAt": "2021-10-04T07:05:02.272Z"
                }
            ],
            "createdAt": "2024-01-03T05:34:39.683Z"
        },
        {
            "_id": "9j3uaz1p",
            "email": "sr5d9z@outlook.com",
            "messages": [
                {
                    "_id": "ur52ag63",
                    "from": "ME",
                    "message": "Message 3ot5w",
                    "createdAt": "2023-03-28T14:04:32.090Z"
                },
                {
                    "_id": "aamlshlc",
                    "from": "ME",
                    "message": "Message xziddfj",
                    "createdAt": "2022-11-23T14:44:35.690Z"
                },
                {
                    "_id": "gvkf2z9y",
                    "from": "ME",
                    "message": "Message ji6ax7",
                    "createdAt": "2022-11-15T02:05:50.710Z"
                },
                {
                    "_id": "ozu7762h",
                    "from": "ME",
                    "message": "Message q8l9bg",
                    "createdAt": "2020-05-12T19:45:48.371Z"
                },
                {
                    "_id": "la8hrab1",
                    "from": "OTHERS",
                    "message": "Message 4nnhs",
                    "createdAt": "2023-07-17T22:44:31.356Z"
                },
                {
                    "_id": "do1dtstp",
                    "from": "OTHERS",
                    "message": "Message 2a89ai",
                    "createdAt": "2021-07-04T18:37:53.032Z"
                },
                {
                    "_id": "f0g69yzu",
                    "from": "ME",
                    "message": "Message ln88lm",
                    "createdAt": "2023-06-24T17:06:28.552Z"
                },
                {
                    "_id": "dw7nsvsx",
                    "from": "OTHERS",
                    "message": "Message zqulu4",
                    "createdAt": "2024-03-27T17:49:58.766Z"
                },
                {
                    "_id": "gwkvxnsy",
                    "from": "OTHERS",
                    "message": "Message zt6bn",
                    "createdAt": "2021-08-15T17:42:12.312Z"
                }
            ],
            "createdAt": "2024-03-04T05:56:32.516Z"
        },
        {
            "_id": "ls6pw4my",
            "email": "2a7rgm@gmail.com",
            "messages": [
                {
                    "_id": "0w1au7qw",
                    "from": "OTHERS",
                    "message": "Message 4ibkv6",
                    "createdAt": "2022-12-13T22:33:33.479Z"
                },
                {
                    "_id": "jpg7ussp",
                    "from": "ME",
                    "message": "Message 1fzbh",
                    "createdAt": "2024-10-21T10:46:32.894Z"
                },
                {
                    "_id": "hwntspo5",
                    "from": "ME",
                    "message": "Message kk7ex",
                    "createdAt": "2024-05-28T01:46:24.306Z"
                },
                {
                    "_id": "dph79j9q",
                    "from": "OTHERS",
                    "message": "Message b57u",
                    "createdAt": "2024-06-25T17:43:27.790Z"
                },
                {
                    "_id": "wu5dqm5i",
                    "from": "ME",
                    "message": "Message 8u7wiv",
                    "createdAt": "2020-07-31T12:12:53.511Z"
                },
                {
                    "_id": "014qhdjb",
                    "from": "ME",
                    "message": "Message no6x",
                    "createdAt": "2021-12-02T03:09:02.951Z"
                },
                {
                    "_id": "9csthejy",
                    "from": "ME",
                    "message": "Message ppjql",
                    "createdAt": "2023-04-06T09:30:14.336Z"
                },
                {
                    "_id": "jw54bqrq",
                    "from": "OTHERS",
                    "message": "Message sosfnx",
                    "createdAt": "2023-05-30T20:39:00.180Z"
                },
                {
                    "_id": "ieb4jh2h",
                    "from": "OTHERS",
                    "message": "Message gn7qp",
                    "createdAt": "2024-04-28T19:43:45.316Z"
                }
            ],
            "createdAt": "2023-01-06T00:45:53.574Z"
        },
        {
            "_id": "q8dy8sum",
            "email": "3gzqvl@yahoo.com",
            "messages": [
                {
                    "_id": "pfkkeogj",
                    "from": "OTHERS",
                    "message": "Message cq3gpj",
                    "createdAt": "2022-12-02T10:05:42.974Z"
                },
                {
                    "_id": "iq3u0hhz",
                    "from": "ME",
                    "message": "Message o7zl",
                    "createdAt": "2021-01-16T03:58:39.635Z"
                },
                {
                    "_id": "svs9nbk7",
                    "from": "OTHERS",
                    "message": "Message 8bh70n",
                    "createdAt": "2023-09-23T15:45:53.159Z"
                },
                {
                    "_id": "ik2xf2ge",
                    "from": "ME",
                    "message": "Message q23go",
                    "createdAt": "2022-05-16T19:01:52.015Z"
                }
            ],
            "createdAt": "2023-05-15T17:58:25.425Z"
        },
        {
            "_id": "ln0inrt7",
            "email": "7fpocs@outlook.com",
            "messages": [
                {
                    "_id": "lf9ppzlq",
                    "from": "ME",
                    "message": "Message ugjpam",
                    "createdAt": "2023-02-26T10:21:06.888Z"
                },
                {
                    "_id": "15j1ifs3",
                    "from": "ME",
                    "message": "Message q8y5e",
                    "createdAt": "2021-10-28T11:46:49.651Z"
                },
                {
                    "_id": "3nnn4s7u",
                    "from": "OTHERS",
                    "message": "Message rq28a",
                    "createdAt": "2022-12-14T01:10:04.658Z"
                },
                {
                    "_id": "03yq9cs6",
                    "from": "ME",
                    "message": "Message dw6jx",
                    "createdAt": "2020-08-13T01:38:42.127Z"
                },
                {
                    "_id": "0kjgz3re",
                    "from": "OTHERS",
                    "message": "Message 6vf4yg",
                    "createdAt": "2021-09-27T20:33:21.912Z"
                },
                {
                    "_id": "62otve7b",
                    "from": "OTHERS",
                    "message": "Message t1kp6",
                    "createdAt": "2022-07-02T21:56:32.056Z"
                }
            ],
            "createdAt": "2023-06-12T16:56:47.107Z"
        },
        {
            "_id": "ynn9s9j9",
            "email": "xx105x@yahoo.com",
            "messages": [
                {
                    "_id": "hp5davmw",
                    "from": "OTHERS",
                    "message": "Message 8xandb",
                    "createdAt": "2023-07-25T16:40:45.878Z"
                },
                {
                    "_id": "uwfde8l8",
                    "from": "OTHERS",
                    "message": "Message vdewtg",
                    "createdAt": "2023-09-01T11:41:37.576Z"
                }
            ],
            "createdAt": "2022-09-24T22:21:55.423Z"
        },
        {
            "_id": "o7tsil6u",
            "email": "t6kj7p@gmail.com",
            "messages": [
                {
                    "_id": "rqgw3y70",
                    "from": "OTHERS",
                    "message": "Message 9npr85",
                    "createdAt": "2021-12-15T18:53:27.203Z"
                },
                {
                    "_id": "3y9zv7g8",
                    "from": "ME",
                    "message": "Message yjf8xj",
                    "createdAt": "2022-11-17T04:46:18.399Z"
                },
                {
                    "_id": "yrcvlznn",
                    "from": "ME",
                    "message": "Message r96xeq",
                    "createdAt": "2023-06-13T11:47:52.737Z"
                }
            ],
            "createdAt": "2024-02-13T02:39:32.741Z"
        },
        {
            "_id": "6zp7pina",
            "email": "a0vsmi@outlook.com",
            "messages": [
                {
                    "_id": "whgt0gbk",
                    "from": "ME",
                    "message": "Message jjhhw",
                    "createdAt": "2024-07-30T23:30:25.059Z"
                },
                {
                    "_id": "shnjr62n",
                    "from": "OTHERS",
                    "message": "Message 92jlf8",
                    "createdAt": "2024-10-01T02:43:20.840Z"
                },
                {
                    "_id": "187vh093",
                    "from": "ME",
                    "message": "Message 0eabml",
                    "createdAt": "2023-02-12T14:12:10.324Z"
                },
                {
                    "_id": "ibgufyof",
                    "from": "OTHERS",
                    "message": "Message y4c25tn",
                    "createdAt": "2024-05-13T01:28:05.168Z"
                },
                {
                    "_id": "6i3fqmta",
                    "from": "ME",
                    "message": "Message yuxf1",
                    "createdAt": "2023-05-11T08:59:20.891Z"
                },
                {
                    "_id": "dfzvvety",
                    "from": "OTHERS",
                    "message": "Message bqiv05",
                    "createdAt": "2020-08-04T18:51:21.225Z"
                },
                {
                    "_id": "t31kw4w0",
                    "from": "OTHERS",
                    "message": "Message 3yeazd",
                    "createdAt": "2022-12-27T05:10:45.184Z"
                },
                {
                    "_id": "p3hqg37i",
                    "from": "ME",
                    "message": "Message eyzr56",
                    "createdAt": "2022-04-26T07:54:11.135Z"
                },
                {
                    "_id": "p0wbevnf",
                    "from": "OTHERS",
                    "message": "Message x4moyg",
                    "createdAt": "2024-09-06T21:39:49.883Z"
                }
            ],
            "createdAt": "2020-12-13T07:58:51.958Z"
        },
        {
            "_id": "09vaaoa4",
            "email": "65zafq@gmail.com",
            "messages": [
                {
                    "_id": "3lz8ucko",
                    "from": "ME",
                    "message": "Message h0300c",
                    "createdAt": "2024-04-26T22:40:54.794Z"
                }
            ],
            "createdAt": "2024-07-04T14:28:25.494Z"
        }
    ]
}