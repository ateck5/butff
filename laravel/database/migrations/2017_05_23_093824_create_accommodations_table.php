<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccommodationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('accommodations')) {
            Schema::create('accommodations', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name', 191);
                $table->string('email', 191)->nullable();
                $table->string('country', 191)->nullable();
                $table->string('city', 191)->nullable();
                $table->string('street', 191)->nullable();
                $table->string('streetNumber', 191)->nullable();
                $table->string('postcode', 191)->nullable();
                $table->string('phone', 191)->nullable();
                $table->string('phoneCountrycode', 191)->nullable();
                $table->string('description', 191)->nullable();
                $table->integer('maxRooms', false, false)->nullable();
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
        Schema::dropIfExists('accommodations');
    }
}
