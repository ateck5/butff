<?php

//use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(AccommodationsTableSeeder::class);
        $this->call(AppointmentsTableSeeder::class);
        $this->call(RolesPermissionsTableSeeder::class);
        $this->call(AppointmentsUsersTableSeeder::class);
        $this->call(AccommodationsUsersTableSeeder::class);
    }
}

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker\Factory::create('nl_NL');
        $data = [
            ['username' => 'admin',
                'role_id' => 1,
                'password' => bcrypt('test1234'),
                'nickname' => 'admin',
                'firstname' => 'admin',
                'lastname' => 'admin',
                'email' => 'admin@admin.com',
                'country' => 'The Netherlands',
                'city' => 'Breda',
                'street' => 'Street',
                'streetNumber' => '123AB',
                'postcode' => '1234 AA',
                'phone' => '06' . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9),
                'phoneCountryCode' => rand(0, 9) . rand(0, 9),
                'discountTotal' => $faker->randomFloat(2, 0, 999),
                'discountDescription' => $faker->text(191),
                'year' => $faker->year,
                'created_at' => $faker->dateTime]
        ];
        for ($i = 0; $i < 50; $i++) {
            array_push($data, [
                'username' => $faker->userName,
                'role_id' => rand(2, 6),
                'password' => bcrypt('secret'),
                'nickname' => $faker->userName,
                'firstname' => $faker->firstName,
                'lastname' => $faker->lastName,
                'email' => $faker->email,
                'country' => $faker->country,
                'city' => $faker->city,
                'street' => $faker->streetName,
                'streetNumber' => rand(0, 999) . $faker->randomLetter,
                'postcode' => $faker->postcode,
                'phone' => '06' . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9),
                'phoneCountryCode' => rand(0, 9) . rand(0, 9),
                'discountTotal' => $faker->randomFloat(2, 0, 999),
                'discountDescription' => $faker->text(191),
                'year' => $faker->year,
                'created_at' => $faker->dateTime
            ]);
        }
        DB::table('users')->insert(
            $data
        );
    }
}

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        $roles = DB::table('roles')->get();
        if ($roles->isEmpty()) {
            DB::table('roles')->insert(
                [
                    [
                        'name' => 'admin',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'editor',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'viewer',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'guest',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'buttv',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'driver',
                        'created_at' => date('Y-m-d H:i:s')
                    ]
                ]
            );
        }
    }
}

class PermissionsTableSeeder extends Seeder
{
    public function run()
    {
        $permissions = DB::table('permissions')->get();
        if ($permissions->isEmpty()) {
            DB::table('permissions')->insert(
                [
                    [
                        'name' => 'getPersonalData',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'editPersonalData',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'getOverviewData',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'editData',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'getChangeLog',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'editAppointments',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'createUsers',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'editUsers',
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'name' => 'editUserRoles',
                        'created_at' => date('Y-m-d H:i:s')
                    ]
                ]
            );
        }
    }
}

class AccommodationsTableSeeder extends seeder
{
    public function run()
    {
        $faker = Faker\Factory::create('nl_NL');
        $data = [];

        for ($i = 0; $i < 50; $i++) {
            array_push($data, [
                'name' => $faker->lastName,
                'email' => $faker->email,
                'country' => $faker->country,
                'city' => $faker->city,
                'street' => $faker->streetName,
                'streetNumber' => rand(0, 999) . $faker->randomLetter,
                'postcode' => $faker->postcode,
                'phone' => '06' . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9),
                'phoneCountryCode' => rand(0, 9) . rand(0, 9),
                'created_at' => $faker->dateTime
            ]);
        }
        DB::table('accommodations')->insert(
            $data
        );

    }
}

class AppointmentsTableSeeder extends seeder
{
    public function run()
    {
        $faker = Faker\Factory::create('nl_NL');
        $types = ['interview', 'transportPerson', 'showMovie', 'giveInformation'];
        $data = [];

        for ($i = 0; $i < 50; $i++) {
            array_push($data, [
                'name' => $faker->word,
                'type' => $types[rand(0, count($types) - 1)],
                'description' => $faker->text,
                'country' => $faker->country,
                'city' => $faker->city,
                'street' => $faker->streetName,
                'streetNumber' => rand(0, 999) . $faker->randomLetter,
                'postcode' => $faker->postcode,
                'timeStart' => $faker->dateTime,
                'timeEnd' => $faker->dateTime,
                'year' => $faker->year,
                'created_at' => $faker->dateTime
            ]);
        }
        DB::table('appointments')->insert(
            $data
        );
    }
}

class RolesPermissionsTableSeeder extends seeder
{
    public function run()
    {
        $roles_permissions = DB::table('roles_permissions')->get();
        if ($roles_permissions->isEmpty()) {
            DB::table('roles_permissions')->insert(
                [
                    [
                        'role_id' => 1,
                        'permission_id' => 1,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 2,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 3,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 4,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 5,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 6,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 7,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 8,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 1,
                        'permission_id' => 9,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 2,
                        'permission_id' => 1,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 2,
                        'permission_id' => 2,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 2,
                        'permission_id' => 3,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 2,
                        'permission_id' => 4,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 2,
                        'permission_id' => 6,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 3,
                        'permission_id' => 1,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 3,
                        'permission_id' => 2,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 3,
                        'permission_id' => 3,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 4,
                        'permission_id' => 1,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 5,
                        'permission_id' => 1,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 5,
                        'permission_id' => 2,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 5,
                        'permission_id' => 6,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 6,
                        'permission_id' => 1,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ],
                    [
                        'role_id' => 6,
                        'permission_id' => 2,
                        'isAllowed' => 1,
                        'created_at' => date('Y-m-d H:i:s')
                    ]
                ]
            );
        }
    }
}
class AppointmentsUsersTableSeeder extends seeder
{
    public function run()
    {
        $faker = Faker\Factory::create('nl_NL');
        $data = [];
        $appointments = DB::table('appointments')->get();
        $users = DB::table('users')->get();

        for ($i = 0; $i < 50; $i++) {
            array_push($data, [
                'appointment_id' => rand(1, count($appointments)),
                'user_id' => rand(1, count($users)),
                'year' => $faker->year,
                'created_at' => $faker->dateTime
            ]);
        }
        DB::table('appointments_users')->insert(
            $data
        );
    }
}
class AccommodationsUsersTableSeeder extends seeder
{
    public function run()
    {
        $faker = Faker\Factory::create('nl_NL');
        $data = [];
        $accommodations = DB::table('accommodations')->get();
        $users = DB::table('users')->get();

        for ($i = 0; $i < 50; $i++) {
            array_push($data, [
                'accommodation_id' => rand(1, count($accommodations)),
                'user_id' => rand(1, count($users)),
                'price' => $faker->randomFloat(2,200,1999),
                'dateArrival' => $faker->dateTime,
                'dateDepartment' => $faker->dateTime,
                'year' => $faker->year,
                'created_at' => $faker->dateTime
            ]);
        }
        DB::table('accommodations_users')->insert(
            $data
        );
    }
}