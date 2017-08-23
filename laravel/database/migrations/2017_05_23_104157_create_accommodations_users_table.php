<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccommodationsUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('accommodations_users');
        if (!Schema::hasTable('accommodations_users')) {
            Schema::create('accommodations_users', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('accommodation_id')->unsigned();
                $table->integer('user_id')->unsigned();
                $table->float('price')->nullable();
                $table->dateTime('dateArrival');
                $table->dateTime('dateDepartment')->nullable();
                $table->string('description', 191)->nullable();
                $table->string('roomNumber', 191)->nullable();
                $table->foreign('accommodation_id')->references('id')->on('accommodations')->onDelete('cascade');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->string('year',191)->nullable();
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
        Schema::dropIfExists('accommodations_users');
    }
}
