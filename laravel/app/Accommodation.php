<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    public function users() {
        return $this->belongsToMany('App\User', 'accommodations_users', 'accommodation_id', 'user_id')->withPivot('price', 'dateArrival', 'dateDepartment', 'year', 'id')->withTimestamps();
    }
}
