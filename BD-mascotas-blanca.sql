PGDMP                         x           mascotas    12.2    12.0 ;    W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Z           1262    82723    mascotas    DATABASE     �   CREATE DATABASE mascotas WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE mascotas;
                postgres    false            �            1259    82794    articulo    TABLE     �   CREATE TABLE public.articulo (
    articulo_id integer NOT NULL,
    descripcion character varying(100),
    precio_publico integer,
    precio_mayorista integer,
    activo boolean
);
    DROP TABLE public.articulo;
       public         heap    postgres    false            �            1259    82792    articulo_articulo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.articulo_articulo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.articulo_articulo_id_seq;
       public          postgres    false    213            [           0    0    articulo_articulo_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.articulo_articulo_id_seq OWNED BY public.articulo.articulo_id;
          public          postgres    false    212            �            1259    82820    categoria_id_seq    SEQUENCE     y   CREATE SEQUENCE public.categoria_id_seq
    START WITH 5
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.categoria_id_seq;
       public          postgres    false            �            1259    82724 	   categoria    TABLE     �   CREATE TABLE public.categoria (
    id integer DEFAULT nextval('public.categoria_id_seq'::regclass) NOT NULL,
    nombre character varying(200)
);
    DROP TABLE public.categoria;
       public         heap    postgres    false    217            �            1259    82816    cliente_id_seq    SEQUENCE     w   CREATE SEQUENCE public.cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.cliente_id_seq;
       public          postgres    false            �            1259    82727    cliente    TABLE     �   CREATE TABLE public.cliente (
    id_cliente integer DEFAULT nextval('public.cliente_id_seq'::regclass) NOT NULL,
    nombre character varying,
    apellido character varying,
    direccion character varying,
    telefono character varying
);
    DROP TABLE public.cliente;
       public         heap    postgres    false    216            �            1259    82733    cliente_mascota    TABLE     �   CREATE TABLE public.cliente_mascota (
    id integer NOT NULL,
    id_cliente integer,
    id_mascota integer,
    activo boolean
);
 #   DROP TABLE public.cliente_mascota;
       public         heap    postgres    false            �            1259    82736    cliente_mascota_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_mascota_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cliente_mascota_id_seq;
       public          postgres    false    204            \           0    0    cliente_mascota_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cliente_mascota_id_seq OWNED BY public.cliente_mascota.id;
          public          postgres    false    205            �            1259    82738    mascota    TABLE     y   CREATE TABLE public.mascota (
    id_mascota integer NOT NULL,
    nombre character varying,
    id_categoria integer
);
    DROP TABLE public.mascota;
       public         heap    postgres    false            �            1259    82784 
   mascota_id    SEQUENCE     s   CREATE SEQUENCE public.mascota_id
    START WITH 5
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.mascota_id;
       public          postgres    false    206            ]           0    0 
   mascota_id    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.mascota_id OWNED BY public.mascota.id_mascota;
          public          postgres    false    211            �            1259    82773    servicio    TABLE     �   CREATE TABLE public.servicio (
    fecha_servicio date,
    id_cliente integer,
    estado character varying,
    id_tipo_servicio integer,
    id_servicio integer NOT NULL,
    id_mascota integer
);
    DROP TABLE public.servicio;
       public         heap    postgres    false            �            1259    82779    servicio_id_servicio_seq    SEQUENCE     �   CREATE SEQUENCE public.servicio_id_servicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.servicio_id_servicio_seq;
       public          postgres    false    209            ^           0    0    servicio_id_servicio_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.servicio_id_servicio_seq OWNED BY public.servicio.id_servicio;
          public          postgres    false    210            �            1259    82752    tipo_servicio    TABLE     t   CREATE TABLE public.tipo_servicio (
    id_tipo_servicio integer NOT NULL,
    nombre_servicio character varying
);
 !   DROP TABLE public.tipo_servicio;
       public         heap    postgres    false            �            1259    82758 "   tipo_servicio_id_tipo_servicio_seq    SEQUENCE     �   CREATE SEQUENCE public.tipo_servicio_id_tipo_servicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.tipo_servicio_id_tipo_servicio_seq;
       public          postgres    false    207            _           0    0 "   tipo_servicio_id_tipo_servicio_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.tipo_servicio_id_tipo_servicio_seq OWNED BY public.tipo_servicio.id_tipo_servicio;
          public          postgres    false    208            �            1259    82802    venta    TABLE     �   CREATE TABLE public.venta (
    venta_id integer NOT NULL,
    fecha_venta date,
    cliente_id integer,
    monto_total integer,
    nro_factura character(100),
    activo boolean
);
    DROP TABLE public.venta;
       public         heap    postgres    false            �            1259    82800    venta_venta_id_seq    SEQUENCE     �   CREATE SEQUENCE public.venta_venta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.venta_venta_id_seq;
       public          postgres    false    215            `           0    0    venta_venta_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.venta_venta_id_seq OWNED BY public.venta.venta_id;
          public          postgres    false    214            �
           2604    82797    articulo articulo_id    DEFAULT     |   ALTER TABLE ONLY public.articulo ALTER COLUMN articulo_id SET DEFAULT nextval('public.articulo_articulo_id_seq'::regclass);
 C   ALTER TABLE public.articulo ALTER COLUMN articulo_id DROP DEFAULT;
       public          postgres    false    213    212    213            �
           2604    82760    cliente_mascota id    DEFAULT     x   ALTER TABLE ONLY public.cliente_mascota ALTER COLUMN id SET DEFAULT nextval('public.cliente_mascota_id_seq'::regclass);
 A   ALTER TABLE public.cliente_mascota ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            �
           2604    82786    mascota id_mascota    DEFAULT     l   ALTER TABLE ONLY public.mascota ALTER COLUMN id_mascota SET DEFAULT nextval('public.mascota_id'::regclass);
 A   ALTER TABLE public.mascota ALTER COLUMN id_mascota DROP DEFAULT;
       public          postgres    false    211    206            �
           2604    82813    servicio id_servicio    DEFAULT     |   ALTER TABLE ONLY public.servicio ALTER COLUMN id_servicio SET DEFAULT nextval('public.servicio_id_servicio_seq'::regclass);
 C   ALTER TABLE public.servicio ALTER COLUMN id_servicio DROP DEFAULT;
       public          postgres    false    210    209            �
           2604    82762    tipo_servicio id_tipo_servicio    DEFAULT     �   ALTER TABLE ONLY public.tipo_servicio ALTER COLUMN id_tipo_servicio SET DEFAULT nextval('public.tipo_servicio_id_tipo_servicio_seq'::regclass);
 M   ALTER TABLE public.tipo_servicio ALTER COLUMN id_tipo_servicio DROP DEFAULT;
       public          postgres    false    208    207            �
           2604    82805    venta venta_id    DEFAULT     p   ALTER TABLE ONLY public.venta ALTER COLUMN venta_id SET DEFAULT nextval('public.venta_venta_id_seq'::regclass);
 =   ALTER TABLE public.venta ALTER COLUMN venta_id DROP DEFAULT;
       public          postgres    false    215    214    215            P          0    82794    articulo 
   TABLE DATA           f   COPY public.articulo (articulo_id, descripcion, precio_publico, precio_mayorista, activo) FROM stdin;
    public          postgres    false    213   <B       E          0    82724 	   categoria 
   TABLE DATA           /   COPY public.categoria (id, nombre) FROM stdin;
    public          postgres    false    202   �B       F          0    82727    cliente 
   TABLE DATA           T   COPY public.cliente (id_cliente, nombre, apellido, direccion, telefono) FROM stdin;
    public          postgres    false    203   �B       G          0    82733    cliente_mascota 
   TABLE DATA           M   COPY public.cliente_mascota (id, id_cliente, id_mascota, activo) FROM stdin;
    public          postgres    false    204   �C       I          0    82738    mascota 
   TABLE DATA           C   COPY public.mascota (id_mascota, nombre, id_categoria) FROM stdin;
    public          postgres    false    206   �C       L          0    82773    servicio 
   TABLE DATA           q   COPY public.servicio (fecha_servicio, id_cliente, estado, id_tipo_servicio, id_servicio, id_mascota) FROM stdin;
    public          postgres    false    209    D       J          0    82752    tipo_servicio 
   TABLE DATA           J   COPY public.tipo_servicio (id_tipo_servicio, nombre_servicio) FROM stdin;
    public          postgres    false    207   �D       R          0    82802    venta 
   TABLE DATA           d   COPY public.venta (venta_id, fecha_venta, cliente_id, monto_total, nro_factura, activo) FROM stdin;
    public          postgres    false    215   �D       a           0    0    articulo_articulo_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.articulo_articulo_id_seq', 6, true);
          public          postgres    false    212            b           0    0    categoria_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.categoria_id_seq', 4, true);
          public          postgres    false    217            c           0    0    cliente_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.cliente_id_seq', 6, true);
          public          postgres    false    216            d           0    0    cliente_mascota_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.cliente_mascota_id_seq', 3, true);
          public          postgres    false    205            e           0    0 
   mascota_id    SEQUENCE SET     9   SELECT pg_catalog.setval('public.mascota_id', 10, true);
          public          postgres    false    211            f           0    0    servicio_id_servicio_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.servicio_id_servicio_seq', 9, true);
          public          postgres    false    210            g           0    0 "   tipo_servicio_id_tipo_servicio_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.tipo_servicio_id_tipo_servicio_seq', 4, true);
          public          postgres    false    208            h           0    0    venta_venta_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.venta_venta_id_seq', 9, true);
          public          postgres    false    214            �
           2606    82799    articulo articulo_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.articulo
    ADD CONSTRAINT articulo_pkey PRIMARY KEY (articulo_id);
 @   ALTER TABLE ONLY public.articulo DROP CONSTRAINT articulo_pkey;
       public            postgres    false    213            �
           2606    82764 "   cliente_mascota cliente_mascota_pk 
   CONSTRAINT     `   ALTER TABLE ONLY public.cliente_mascota
    ADD CONSTRAINT cliente_mascota_pk PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.cliente_mascota DROP CONSTRAINT cliente_mascota_pk;
       public            postgres    false    204            �
           2606    82766    cliente cliente_pk 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pk PRIMARY KEY (id_cliente);
 <   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pk;
       public            postgres    false    203            �
           2606    82768    mascota mascota_pk 
   CONSTRAINT     X   ALTER TABLE ONLY public.mascota
    ADD CONSTRAINT mascota_pk PRIMARY KEY (id_mascota);
 <   ALTER TABLE ONLY public.mascota DROP CONSTRAINT mascota_pk;
       public            postgres    false    206            �
           2606    82815    servicio servicio_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT servicio_pkey PRIMARY KEY (id_servicio);
 @   ALTER TABLE ONLY public.servicio DROP CONSTRAINT servicio_pkey;
       public            postgres    false    209            �
           2606    82772    tipo_servicio tipo_servicio_pk 
   CONSTRAINT     j   ALTER TABLE ONLY public.tipo_servicio
    ADD CONSTRAINT tipo_servicio_pk PRIMARY KEY (id_tipo_servicio);
 H   ALTER TABLE ONLY public.tipo_servicio DROP CONSTRAINT tipo_servicio_pk;
       public            postgres    false    207            �
           2606    82807    venta venta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (venta_id);
 :   ALTER TABLE ONLY public.venta DROP CONSTRAINT venta_pkey;
       public            postgres    false    215            �
           2606    82823    servicio fk_cliente    FK CONSTRAINT     �   ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) NOT VALID;
 =   ALTER TABLE ONLY public.servicio DROP CONSTRAINT fk_cliente;
       public          postgres    false    2742    203    209            �
           2606    82808    venta fk_cliente_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.venta
    ADD CONSTRAINT fk_cliente_id FOREIGN KEY (cliente_id) REFERENCES public.cliente(id_cliente) NOT VALID;
 =   ALTER TABLE ONLY public.venta DROP CONSTRAINT fk_cliente_id;
       public          postgres    false    203    215    2742            �
           2606    82828    servicio fk_mascota    FK CONSTRAINT     �   ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT fk_mascota FOREIGN KEY (id_mascota) REFERENCES public.mascota(id_mascota) NOT VALID;
 =   ALTER TABLE ONLY public.servicio DROP CONSTRAINT fk_mascota;
       public          postgres    false    2746    209    206            �
           2606    82833    servicio fk_tipo_servicio    FK CONSTRAINT     �   ALTER TABLE ONLY public.servicio
    ADD CONSTRAINT fk_tipo_servicio FOREIGN KEY (id_tipo_servicio) REFERENCES public.tipo_servicio(id_tipo_servicio) NOT VALID;
 C   ALTER TABLE ONLY public.servicio DROP CONSTRAINT fk_tipo_servicio;
       public          postgres    false    2748    207    209            P   ]   x�3�L���I,R(H-*��42 NCY�e�LO,A�3��f�$B�A��F�9��Pc�F#�F3�Ģ���Ҝ|������)D6F��� o�%�      E   +   x�3�,H-*��2�LO,��2����L83s�KR��b���� �v
B      F   �   x���
�0 �s���Z+�ĳ��-��t��_o=?^C⇚C-$��Y_���V�榅�g] ��]�{���	F��V#ŵus���$m������� �L��l�+�E�$i&��܁��V�9�,S���C/�      G   !   x�3�4�4�,�2�4�J���������� ?�4      I   \   x�3���L���4�2�,�OJ��4�2�,H�K���4�2�,�/��4�22��A�fYsΐ��\���o~II~�i��4�d�Bm� O�b      L   o   x�U��
�0Dϓ�4Y��/{�9���1�UZ��ex��;f'M�r�g�b!y�A�{���vZ�L�x�EӲj�=�w(�s=�`�����(BK+儹U���0};"�.�      J   :   x�3�tJ<�1�ˈ3,1�4/19���<.cN��"(ۄ�9��$U!%U����D�=... $��      R   r   x��ӱ�0D�ڞ��|�8�.�L����P��/����
Xhq�3a�JN��L�F��|�i��e����k{�����g�Fۥy�ii�{�v0�μ�>��-B�n     