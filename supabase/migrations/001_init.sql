create extension if not exists postgis;
create extension if not exists pgcrypto;

create table if not exists rooms (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    owner_id uuid,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists room_members (
    room_id uuid not null references rooms(id) on delete cascade,
    user_id uuid not null,
    role text not null default 'member',
    created_at timestamptz not null default now(),

    primary key (room_id, user_id)
);

create table if not exists features (
    id uuid primary key default gen_random_uuid(),

    room_id uuid not null
        references rooms(id)
        on delete cascade,

    geometry geometry(Geometry, 4326) not null,

    properties jsonb not null default '{}'::jsonb,

    created_by uuid,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists features_room_id_idx
    on features(room_id);

create index if not exists features_geometry_idx
    on features
    using gist(geometry);

create table if not exists room_snapshots (
    room_id uuid primary key
        references rooms(id)
        on delete cascade,

    snapshot jsonb not null,

    updated_at timestamptz not null default now()
);