<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'type',
        'description',
        'country',
        'city',
        'street',
        'streetNumber',
        'postcode',
        'timeStart',
        'timeEnd',
        'year'
    ];
}
