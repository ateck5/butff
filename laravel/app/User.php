<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
}
