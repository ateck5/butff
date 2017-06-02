<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('appointments')) {
            Schema::create('appointments', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name', 191);
                $table->string('type', 191);
                $table->string('description', 191);
                $table->string('country', 191)->nullable();
                $table->string('city', 191)->nullable();
                $table->string('street', 191)->nullable();
                $table->string('streetNumber', 191)->nullable();
                $table->string('postcode', 191)->nullable();
                $table->dateTime('timeStart');
                $table->dateTime('timeEnd')->nullable();
                $table->string('year', 191);
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
        Schema::dropIfExists('appointments');
    }
}
