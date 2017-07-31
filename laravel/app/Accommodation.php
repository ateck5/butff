<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    public function users() {
        return $this->belongsToMany('User', 'accommodations_users', 'user_id', 'accommodation_id')->withPivot('price', 'dateArrival', 'dateDepartment', 'year')->withTimestamps();
    }
}
