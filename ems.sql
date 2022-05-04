--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-3)
-- Dumped by pg_dump version 12.4 (Debian 12.4-3)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: DailyMonitoring; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DailyMonitoring" (
    id integer NOT NULL,
    census_count integer NOT NULL,
    important_notes text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    inspection_date text NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."DailyMonitoring" OWNER TO postgres;

--
-- Name: DailyMonitoring_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DailyMonitoring_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DailyMonitoring_id_seq" OWNER TO postgres;

--
-- Name: DailyMonitoring_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DailyMonitoring_id_seq" OWNED BY public."DailyMonitoring".id;


--
-- Name: FirePressures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FirePressures" (
    id integer NOT NULL,
    floor_id integer NOT NULL,
    pressure double precision NOT NULL,
    inspection_id integer NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."FirePressures" OWNER TO postgres;

--
-- Name: FirePressures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FirePressures_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."FirePressures_id_seq" OWNER TO postgres;

--
-- Name: FirePressures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FirePressures_id_seq" OWNED BY public."FirePressures".id;


--
-- Name: Floor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Floor" (
    id integer NOT NULL,
    num text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Floor" OWNER TO postgres;

--
-- Name: Floor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Floor_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Floor_id_seq" OWNER TO postgres;

--
-- Name: Floor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Floor_id_seq" OWNED BY public."Floor".id;


--
-- Name: Generator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Generator" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Generator" OWNER TO postgres;

--
-- Name: GeneratorStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GeneratorStatus" (
    id integer NOT NULL,
    generator_id integer NOT NULL,
    inspection_id integer NOT NULL,
    bat_voltage double precision NOT NULL,
    engine_oil text NOT NULL,
    fuel_level text NOT NULL,
    coolant text NOT NULL,
    syncro_stat text NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."GeneratorStatus" OWNER TO postgres;

--
-- Name: GeneratorStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GeneratorStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GeneratorStatus_id_seq" OWNER TO postgres;

--
-- Name: GeneratorStatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GeneratorStatus_id_seq" OWNED BY public."GeneratorStatus".id;


--
-- Name: Generator_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Generator_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Generator_id_seq" OWNER TO postgres;

--
-- Name: Generator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Generator_id_seq" OWNED BY public."Generator".id;


--
-- Name: Inspection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Inspection" (
    id integer NOT NULL,
    monitoring_id integer NOT NULL,
    time_inspected text NOT NULL,
    remarks text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    inspection_incharge integer NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Inspection" OWNER TO postgres;

--
-- Name: Inspection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Inspection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Inspection_id_seq" OWNER TO postgres;

--
-- Name: Inspection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Inspection_id_seq" OWNED BY public."Inspection".id;


--
-- Name: Note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Note" (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Note" OWNER TO postgres;

--
-- Name: Note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Note_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Note_id_seq" OWNER TO postgres;

--
-- Name: Note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Note_id_seq" OWNED BY public."Note".id;


--
-- Name: PolutionControl; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PolutionControl" (
    id integer NOT NULL,
    waste_id integer NOT NULL,
    quantity double precision NOT NULL,
    inspection_id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    unit_id integer NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."PolutionControl" OWNER TO postgres;

--
-- Name: PolutionControl_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PolutionControl_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PolutionControl_id_seq" OWNER TO postgres;

--
-- Name: PolutionControl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PolutionControl_id_seq" OWNED BY public."PolutionControl".id;


--
-- Name: PowerShiftReading; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PowerShiftReading" (
    id integer NOT NULL,
    inspection_id integer NOT NULL,
    mode text NOT NULL,
    line_volt_1 double precision NOT NULL,
    line_volt_2 double precision NOT NULL,
    line_volt_3 double precision NOT NULL,
    line_curr_1 double precision NOT NULL,
    line_curr_2 double precision NOT NULL,
    line_curr_3 double precision NOT NULL,
    duration_start text NOT NULL,
    duration_end text NOT NULL,
    shift_order integer NOT NULL,
    power_type text NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."PowerShiftReading" OWNER TO postgres;

--
-- Name: PowerShiftReading_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PowerShiftReading_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PowerShiftReading_id_seq" OWNER TO postgres;

--
-- Name: PowerShiftReading_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PowerShiftReading_id_seq" OWNED BY public."PowerShiftReading".id;


--
-- Name: Pump; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pump" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Pump" OWNER TO postgres;

--
-- Name: PumpCheck; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PumpCheck" (
    id integer NOT NULL,
    inspection_id integer NOT NULL,
    pump_id integer NOT NULL,
    pump_mode text NOT NULL,
    pump_pressure double precision NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."PumpCheck" OWNER TO postgres;

--
-- Name: PumpCheck_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PumpCheck_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PumpCheck_id_seq" OWNER TO postgres;

--
-- Name: PumpCheck_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PumpCheck_id_seq" OWNED BY public."PumpCheck".id;


--
-- Name: PumpReading; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PumpReading" (
    id integer NOT NULL,
    inspection_id integer NOT NULL,
    pump_room_read double precision NOT NULL,
    pump_station_read double precision NOT NULL,
    stp_discharge_read double precision NOT NULL,
    stp_recycled_read double precision NOT NULL,
    main_kwhr_read double precision NOT NULL,
    stp_kwhr_read double precision NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."PumpReading" OWNER TO postgres;

--
-- Name: PumpReading_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PumpReading_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PumpReading_id_seq" OWNER TO postgres;

--
-- Name: PumpReading_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PumpReading_id_seq" OWNED BY public."PumpReading".id;


--
-- Name: Pump_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pump_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Pump_id_seq" OWNER TO postgres;

--
-- Name: Pump_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pump_id_seq" OWNED BY public."Pump".id;


--
-- Name: Unit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Unit" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Unit" OWNER TO postgres;

--
-- Name: Unit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Unit_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Unit_id_seq" OWNER TO postgres;

--
-- Name: Unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Unit_id_seq" OWNED BY public."Unit".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Waste; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Waste" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Waste" OWNER TO postgres;

--
-- Name: Waste_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Waste_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Waste_id_seq" OWNER TO postgres;

--
-- Name: Waste_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Waste_id_seq" OWNED BY public."Waste".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: DailyMonitoring id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyMonitoring" ALTER COLUMN id SET DEFAULT nextval('public."DailyMonitoring_id_seq"'::regclass);


--
-- Name: FirePressures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FirePressures" ALTER COLUMN id SET DEFAULT nextval('public."FirePressures_id_seq"'::regclass);


--
-- Name: Floor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Floor" ALTER COLUMN id SET DEFAULT nextval('public."Floor_id_seq"'::regclass);


--
-- Name: Generator id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Generator" ALTER COLUMN id SET DEFAULT nextval('public."Generator_id_seq"'::regclass);


--
-- Name: GeneratorStatus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GeneratorStatus" ALTER COLUMN id SET DEFAULT nextval('public."GeneratorStatus_id_seq"'::regclass);


--
-- Name: Inspection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inspection" ALTER COLUMN id SET DEFAULT nextval('public."Inspection_id_seq"'::regclass);


--
-- Name: Note id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Note" ALTER COLUMN id SET DEFAULT nextval('public."Note_id_seq"'::regclass);


--
-- Name: PolutionControl id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PolutionControl" ALTER COLUMN id SET DEFAULT nextval('public."PolutionControl_id_seq"'::regclass);


--
-- Name: PowerShiftReading id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PowerShiftReading" ALTER COLUMN id SET DEFAULT nextval('public."PowerShiftReading_id_seq"'::regclass);


--
-- Name: Pump id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pump" ALTER COLUMN id SET DEFAULT nextval('public."Pump_id_seq"'::regclass);


--
-- Name: PumpCheck id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PumpCheck" ALTER COLUMN id SET DEFAULT nextval('public."PumpCheck_id_seq"'::regclass);


--
-- Name: PumpReading id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PumpReading" ALTER COLUMN id SET DEFAULT nextval('public."PumpReading_id_seq"'::regclass);


--
-- Name: Unit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unit" ALTER COLUMN id SET DEFAULT nextval('public."Unit_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Waste id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Waste" ALTER COLUMN id SET DEFAULT nextval('public."Waste_id_seq"'::regclass);


--
-- Data for Name: DailyMonitoring; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DailyMonitoring" (id, census_count, important_notes, "createdAt", "updatedAt", inspection_date, deleted) FROM stdin;
3	23	Very good!!	2022-03-28 01:43:23.078	2022-03-28 01:43:23.078	2212-05-22	f
4	43	Yeah...	2022-03-28 02:40:42.562	2022-03-28 02:40:42.562	2094-03-24	f
7	45	This is not good.	2022-03-31 03:12:02.542	2022-03-31 03:12:02.546	2022-03-16	f
10	24	wkdjankdsn\n	2022-04-01 03:41:19.212	2022-04-01 03:41:19.242	2022-04-06	f
6	45	There it is.	2022-03-30 08:32:08.799	2022-03-30 08:32:08.799	2022-03-15	f
\.


--
-- Data for Name: FirePressures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FirePressures" (id, floor_id, pressure, inspection_id, deleted) FROM stdin;
\.


--
-- Data for Name: Floor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Floor" (id, num, description, "createdAt", "updatedAt", deleted) FROM stdin;
2	B2	Second Basement	2022-03-18 03:08:06.836	2022-03-18 03:08:06.836	f
3	G	Ground Floor	2022-03-18 03:08:55.524	2022-03-18 03:08:55.524	f
4	2	Second Floor	2022-03-18 03:09:59.536	2022-03-18 03:09:59.536	f
5	3	Third Floor	2022-03-18 03:10:08.824	2022-03-18 03:10:08.824	f
6	4	Fourth Floor	2022-03-18 03:10:16.678	2022-03-18 03:10:16.678	f
7	5	Fifth Floor	2022-03-18 03:10:28.303	2022-03-18 03:10:28.303	f
9	7	Seventh Floor	2022-03-18 03:10:42.047	2022-03-18 03:10:42.047	f
10	H	Helipad Floor	2022-03-18 03:10:49.176	2022-03-18 03:10:49.176	f
11	8	Eighth Floor	2022-03-18 03:10:54.982	2022-03-18 03:10:54.982	f
13	6	Sixth Floor	2022-03-22 08:38:01.269	2022-03-22 08:38:01.269	f
14	B1	First Basement	2022-03-22 08:38:18.733	2022-03-22 08:38:18.733	f
\.


--
-- Data for Name: Generator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Generator" (id, name, description, "createdAt", "updatedAt", deleted) FROM stdin;
43	Gen 3	4000w powered generator.	2022-03-22 02:29:38.329	2022-03-22 02:29:38.329	t
42	Gen 4	3510w powered generator.	2022-03-22 02:15:29.693	2022-04-05 06:55:04.479	f
\.


--
-- Data for Name: GeneratorStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."GeneratorStatus" (id, generator_id, inspection_id, bat_voltage, engine_oil, fuel_level, coolant, syncro_stat, deleted) FROM stdin;
\.


--
-- Data for Name: Inspection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Inspection" (id, monitoring_id, time_inspected, remarks, "createdAt", "updatedAt", inspection_incharge, deleted) FROM stdin;
4	4	1:00	This is not bad.	2022-03-28 03:06:57.194	2022-03-28 03:06:57.194	1	f
6	3	04-12-4152	Lot of remarks?	2022-03-29 01:01:39.971	2022-03-29 01:01:39.971	4	f
8	3	6:00 pm	Okay.	2022-03-29 01:46:59.058	2022-03-29 01:46:59.058	1	f
\.


--
-- Data for Name: Note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Note" (id, title, content, "createdAt", "updatedAt") FROM stdin;
2	My Note213	This is my second note.	2022-03-18 01:13:49.424	2022-03-22 01:43:22.071
4	Hello	yow	2022-03-22 01:43:39.1	2022-03-22 01:43:48.904
\.


--
-- Data for Name: PolutionControl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PolutionControl" (id, waste_id, quantity, inspection_id, "createdAt", "updatedAt", unit_id, deleted) FROM stdin;
10	1	60.12	4	2022-03-28 07:35:55.006	2022-03-28 07:35:55.006	1	f
12	2	124.23	4	2022-03-29 02:48:51.046	2022-03-29 02:48:51.046	1	f
\.


--
-- Data for Name: PowerShiftReading; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PowerShiftReading" (id, inspection_id, mode, line_volt_1, line_volt_2, line_volt_3, line_curr_1, line_curr_2, line_curr_3, duration_start, duration_end, shift_order, power_type, deleted) FROM stdin;
\.


--
-- Data for Name: Pump; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pump" (id, name, description, "createdAt", "updatedAt", deleted) FROM stdin;
2	Transport Pump	My Pump.	2022-03-18 03:44:05.581	2022-03-18 03:44:05.581	f
4	Phil Pump	Pump for the better.	2022-03-22 06:01:24.085	2022-03-22 06:01:24.109	f
5	Fire Pump	Fires and Storms	2022-03-22 08:42:17.206	2022-03-22 08:42:17.206	f
1	Power Pump	My First Pump	2022-03-18 03:43:31.972	2022-03-18 03:43:31.972	t
\.


--
-- Data for Name: PumpCheck; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PumpCheck" (id, inspection_id, pump_id, pump_mode, pump_pressure, deleted) FROM stdin;
\.


--
-- Data for Name: PumpReading; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PumpReading" (id, inspection_id, pump_room_read, pump_station_read, stp_discharge_read, stp_recycled_read, main_kwhr_read, stp_kwhr_read, deleted) FROM stdin;
\.


--
-- Data for Name: Unit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Unit" (id, name, description, deleted) FROM stdin;
1	kg	kilogram	f
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, password, email, name, "createdAt", "updatedAt") FROM stdin;
1	user	$2b$10$I6C2R7pp/DDPVttzLT7yquDelX3VY3yXvXztMhLTvrHi6SCV.YIB2			2022-03-17 09:00:49.477	2022-03-17 09:00:49.478
4	username	$2b$10$nG8gfTTTXXtS6eC/vOlI5ut3yIwjSW/qIdg4yrSxef3olXmCYL4xe			2022-03-25 06:24:22.766	2022-03-25 06:24:22.767
\.


--
-- Data for Name: Waste; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Waste" (id, name, description, "createdAt", "updatedAt", deleted) FROM stdin;
1	Green Waste	Composts and Egg Yolks.	2022-03-22 07:24:44.372	2022-03-22 07:24:44.372	f
2	Yellow Waste	Hazardous Materials.	2022-03-22 07:26:25.47	2022-03-22 07:26:25.47	f
3	Black Waste	Deadly	2022-03-22 08:41:08.54	2022-03-22 08:41:08.54	f
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5dde3577-9ef0-4ac9-90aa-d939f2afdb00	d98050ef26b302105d1d97eb905a8022ddca6d6330c5f57fb9e872e624c7206a	2022-03-17 08:49:52.938908+00	20220310155644_add_column_email_name_user	\N	\N	2022-03-17 08:49:52.897845+00	1
93bf80f6-2ebc-416b-bf20-96bab6d94d24	805852eceb68e7fae3b93fd6ec796a0937d8e7d8baec6b023790d38ece4aa4f6	2022-03-17 08:49:52.950814+00	20220310160636_nullable_column_email_name	\N	\N	2022-03-17 08:49:52.941759+00	1
d04ea57d-bcd9-4d06-aac6-7ed346c48533	d304166e136cef4bbe171c0811718057e0c3ddc21742df6775bad4831f1abdde	2022-03-17 08:49:52.961817+00	20220310161409_migrated_20220310160636_nullable_column_email_name	\N	\N	2022-03-17 08:49:52.952674+00	1
\.


--
-- Name: DailyMonitoring_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."DailyMonitoring_id_seq"', 11, true);


--
-- Name: FirePressures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FirePressures_id_seq"', 1, false);


--
-- Name: Floor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Floor_id_seq"', 14, true);


--
-- Name: GeneratorStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."GeneratorStatus_id_seq"', 1, false);


--
-- Name: Generator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Generator_id_seq"', 43, true);


--
-- Name: Inspection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Inspection_id_seq"', 13, true);


--
-- Name: Note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Note_id_seq"', 4, true);


--
-- Name: PolutionControl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PolutionControl_id_seq"', 14, true);


--
-- Name: PowerShiftReading_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PowerShiftReading_id_seq"', 1, false);


--
-- Name: PumpCheck_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PumpCheck_id_seq"', 1, false);


--
-- Name: PumpReading_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PumpReading_id_seq"', 1, false);


--
-- Name: Pump_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pump_id_seq"', 5, true);


--
-- Name: Unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Unit_id_seq"', 1, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- Name: Waste_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Waste_id_seq"', 3, true);


--
-- Name: DailyMonitoring DailyMonitoring_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DailyMonitoring"
    ADD CONSTRAINT "DailyMonitoring_pkey" PRIMARY KEY (id);


--
-- Name: FirePressures FirePressures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FirePressures"
    ADD CONSTRAINT "FirePressures_pkey" PRIMARY KEY (id);


--
-- Name: Floor Floor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Floor"
    ADD CONSTRAINT "Floor_pkey" PRIMARY KEY (id);


--
-- Name: GeneratorStatus GeneratorStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GeneratorStatus"
    ADD CONSTRAINT "GeneratorStatus_pkey" PRIMARY KEY (id);


--
-- Name: Generator Generator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Generator"
    ADD CONSTRAINT "Generator_pkey" PRIMARY KEY (id);


--
-- Name: Inspection Inspection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inspection"
    ADD CONSTRAINT "Inspection_pkey" PRIMARY KEY (id);


--
-- Name: Note Note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_pkey" PRIMARY KEY (id);


--
-- Name: PolutionControl PolutionControl_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PolutionControl"
    ADD CONSTRAINT "PolutionControl_pkey" PRIMARY KEY (id);


--
-- Name: PowerShiftReading PowerShiftReading_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PowerShiftReading"
    ADD CONSTRAINT "PowerShiftReading_pkey" PRIMARY KEY (id);


--
-- Name: PumpCheck PumpCheck_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PumpCheck"
    ADD CONSTRAINT "PumpCheck_pkey" PRIMARY KEY (id);


--
-- Name: PumpReading PumpReading_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PumpReading"
    ADD CONSTRAINT "PumpReading_pkey" PRIMARY KEY (id);


--
-- Name: Pump Pump_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pump"
    ADD CONSTRAINT "Pump_pkey" PRIMARY KEY (id);


--
-- Name: Unit Unit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Waste Waste_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Waste"
    ADD CONSTRAINT "Waste_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: FirePressures FirePressures_floor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FirePressures"
    ADD CONSTRAINT "FirePressures_floor_id_fkey" FOREIGN KEY (floor_id) REFERENCES public."Floor"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: FirePressures FirePressures_inspection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FirePressures"
    ADD CONSTRAINT "FirePressures_inspection_id_fkey" FOREIGN KEY (inspection_id) REFERENCES public."Inspection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GeneratorStatus GeneratorStatus_generator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GeneratorStatus"
    ADD CONSTRAINT "GeneratorStatus_generator_id_fkey" FOREIGN KEY (generator_id) REFERENCES public."Generator"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: GeneratorStatus GeneratorStatus_inspection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GeneratorStatus"
    ADD CONSTRAINT "GeneratorStatus_inspection_id_fkey" FOREIGN KEY (inspection_id) REFERENCES public."Inspection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Inspection Inspection_inspection_incharge_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inspection"
    ADD CONSTRAINT "Inspection_inspection_incharge_fkey" FOREIGN KEY (inspection_incharge) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Inspection Inspection_monitoring_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Inspection"
    ADD CONSTRAINT "Inspection_monitoring_id_fkey" FOREIGN KEY (monitoring_id) REFERENCES public."DailyMonitoring"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PolutionControl PolutionControl_inspection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PolutionControl"
    ADD CONSTRAINT "PolutionControl_inspection_id_fkey" FOREIGN KEY (inspection_id) REFERENCES public."Inspection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PolutionControl PolutionControl_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PolutionControl"
    ADD CONSTRAINT "PolutionControl_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PolutionControl PolutionControl_waste_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PolutionControl"
    ADD CONSTRAINT "PolutionControl_waste_id_fkey" FOREIGN KEY (waste_id) REFERENCES public."Waste"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PowerShiftReading PowerShiftReading_inspection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PowerShiftReading"
    ADD CONSTRAINT "PowerShiftReading_inspection_id_fkey" FOREIGN KEY (inspection_id) REFERENCES public."Inspection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PumpCheck PumpCheck_inspection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PumpCheck"
    ADD CONSTRAINT "PumpCheck_inspection_id_fkey" FOREIGN KEY (inspection_id) REFERENCES public."Inspection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PumpCheck PumpCheck_pump_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PumpCheck"
    ADD CONSTRAINT "PumpCheck_pump_id_fkey" FOREIGN KEY (pump_id) REFERENCES public."Pump"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PumpReading PumpReading_inspection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PumpReading"
    ADD CONSTRAINT "PumpReading_inspection_id_fkey" FOREIGN KEY (inspection_id) REFERENCES public."Inspection"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

