<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Appointment;
use App\Accommodation;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'role_id',
        'password',
        'nickname',
        'firstname',
        'lastname',
        'email',
        'country',
        'city',
        'street',
        'streetNumber',
        'postcode',
        'phone',
        'phoneCountryCode',
        'discountTotal',
        'discountDescription',
        'year'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function appointments() {
        return $this->belongsToMany('App\Appointment', 'appointments_users', 'user_id', 'appointment_id')->withPivot( 'year', 'id')->withTimestamps();
    }

    public function accommodations() {
        return $this->belongsToMany('App\Accommodation', 'accommodations_users', 'user_id', 'accommodation_id')
            ->withPivot('price', 'dateArrival', 'dateDepartment', 'year', 'id', 'roomNumber', 'description')
            ->withTimestamps();
    }
}
