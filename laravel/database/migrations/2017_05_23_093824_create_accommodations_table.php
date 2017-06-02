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
                $table->string('email', 191);
                $table->string('country', 191);
                $table->string('city', 191);
                $table->string('street', 191);
                $table->string('streetNumber', 191)->nullable();
                $table->string('postcode', 191);
                $table->string('phone', 191);
                $table->string('phoneCountrycode', 191)->nullable();
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
