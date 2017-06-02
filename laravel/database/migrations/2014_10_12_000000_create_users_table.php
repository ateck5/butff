<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('users')) {
            Schema::create('users', function (Blueprint $table) {
                $table->increments('id');
                $table->string('username', 191)->unique();
                $table->integer('role_id')->unsigned();
                $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
                $table->string('password', 191);
                $table->string('nickname', 191)->nullable();
                $table->string('firstname', 191);
                $table->string('lastname', 191);
                $table->string('email', 191);
                $table->string('country', 191)->nullable();
                $table->string('city', 191)->nullable();
                $table->string('street', 191)->nullable();
                $table->string('streetNumber', 191)->nullable();
                $table->string('postcode', 191)->nullable();
                $table->string('phone', 191);
                $table->string('phoneCountrycode', 191)->nullable();
                $table->float('discountTotal')->nullable();
                $table->string('discountDescription', 191)->nullable();
                $table->string('year', 191)->nullable();
                $table->rememberToken();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
