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

    public function users() {
        return $this->belongsToMany('App\User', 'appointments_users', 'appointment_id', 'user_id')->withPivot( 'year', 'id')->withTimestamps();
    }
}
