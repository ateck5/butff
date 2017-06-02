<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppointmentsUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('appointments_users');
        if (!Schema::hasTable('appointments_users')) {
            Schema::create('appointments_users', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('appointment_id')->unsigned();
                $table->integer('user_id')->unsigned();
                $table->foreign('appointment_id')->references('id')->on('appointments')->onDelete('cascade');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->string('year',191);
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
        Schema::dropIfExists('appointments_users');
    }
}
