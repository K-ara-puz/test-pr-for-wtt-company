--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2023-10-03 21:18:13

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
-- TOC entry 217 (class 1259 OID 16823)
-- Name: tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tests (
    test_id integer,
    test_question character varying(256) NOT NULL,
    test_answer integer NOT NULL,
    user_id integer
);


ALTER TABLE public.tests OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16789)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_login character varying(36) NOT NULL,
    user_password character varying(256) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16788)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4786 (class 0 OID 16823)
-- Dependencies: 217
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tests (test_id, test_question, test_answer, user_id) FROM stdin;
1	2 + 3 = ?	5	2
1	25 - 20 = ?	5	2
1	34 + 66 = ?	100	2
1	87 + 113 = ?	200	2
1	25 + 3 = ?	28	2
2	22 / 2 = ?	11	1
2	5 * 20 = ?	100	1
2	36 / 6 = ?	6	1
2	80 * 0,5 = ?	40	1
3	0 + 3 = ?	3	2
3	20 / 20 = ?	1	2
\.


--
-- TOC entry 4785 (class 0 OID 16789)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, user_login, user_password) FROM stdin;
1	user1	Wsxc1290
2	user2	Edcv2389
\.


--
-- TOC entry 4792 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- TOC entry 4639 (class 2606 OID 16811)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4640 (class 2606 OID 16828)
-- Name: tests fk_test_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT fk_test_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2023-10-03 21:18:14

--
-- PostgreSQL database dump complete
--

