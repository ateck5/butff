<?php

namespace App\Http\Controllers;

use App\User;
use App\Appointment;
use App\AppointmentsUsers;
use Illuminate\Http\Request;

class AppointmentUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $appointmentsUsers[] = AppointmentsUsers::all();

        return response()->json($appointmentsUsers, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }

        $appointmentUserObject = new AppointmentsUsers();
        $appointmentUserObject->user_id = $request['newAppointmentUser']['user'];
        $appointmentUserObject->appointment_id = $request['newAppointmentUser']['appointment'];
        $appointmentUserObject->year = date("Y");

        try {
            $appointmentUserObject->save();
        } catch (\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                return response()->json("Error: Item already exists in the database", 400);
                // houston, we have a duplicate entry problem
            }
            return response()->json(["Something went wrong", $e, $request->all()], 503);
        }


        return response()->json([$appointmentUserObject, $request->all()], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $appointmentsUser = AppointmentsUsers::where('user_id', $id)
            ->orderBy('id')
            ->get();

        return response()->json($appointmentsUser, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']) {
            return response()->json("Error: Credentials did not match", 403);
        }
        $appointmentUser = AppointmentsUsers::findOrFail($id);

        //TODO: add updated timestamp

        //TODO: fix datetime format
        $appointmentUser->user_id = $request['appointment']['user'];
        $appointmentUser->appointment_id = $request['appointment']['appointment'];
        $appointmentUser->year = date("Y");

        $appointmentUser->update();

        return response()->json($appointmentUser, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
